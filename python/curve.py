from math import *
import json
import numpy as np

def f(x):
    x *= 10
    return log2(x/(201-x))

def filter_grades(grades,codes):
    filtered_grades = []
    filtered_codes = []

    for i in range(len(grades)):
        if grades[i] == "" or grades[i] == "ΑΠΟΥΣΙΑ":
            continue

        flgrade = float(grades[i])

        if flgrade == 0:
            continue

        filtered_grades.append(flgrade)
        filtered_codes.append(codes[i])

    return filtered_grades, filtered_codes

def get_mean(grades):
    return sum(grades)/len(grades)

def get_stdev(grades):
    mean = get_mean(grades)
    return sqrt(sum([(x-mean)**2 for x in grades])/len(grades))

def get_final_grades(initial_grades,initial_codes):
    grades,codes = filter_grades(initial_grades,initial_codes)
    grades = [f(x) for x in grades]

    mean = get_mean(grades)
    stdev = get_stdev(grades)

    final_grades = list(map(lambda x: 10+3*(x-mean)/stdev,grades))

    return final_grades,codes

def split_lesson_data(data):
    grades = []
    codes = []

    for code in data:
        codes.append(code)
        grades.append(data[code])

    return grades,codes

def get_final_ranking(data,plaisio):

    student_grade = {}
    student_count = {}

    for lesson in plaisio:
        grades,codes = split_lesson_data(data[lesson])
        grades,codes = get_final_grades(grades,codes)
        
        for i in range(len(codes)):
            student_grade[codes[i]] = student_grade.get(codes[i],0) + grades[i]
            student_count[codes[i]] = student_count.get(codes[i],0) + 1
    
    for code in student_count:
        if student_count[code] != len(plaisio):
            del student_grade[code]
            continue

        student_grade[code] = student_grade[code]/len(plaisio)
    
    return student_grade

def sort_ranking(ranking):
    return sorted(ranking.items(),key=lambda x:x[1],reverse=True)

def normalize(ranking):
    A = [8,11,13,15,17,19,20]
    p = [0,10,20,40,65,85,100]

    grades = [grade for code,grade in ranking]
    x = [np.percentile(grades,perc) for perc in p]



    print(x)

    result = {}

    for code,grade in ranking:
        for i in range(len(A)-1):
            if grade <= x[i+1]:
                    result[code] = A[i] + (A[i+1] - A[i])*(grade - x[i])/(x[i+1] - x[i])

    return result

with open("./data/lessons_data.json") as fin, open("./data/curves/iatriki.json","w") as fout:

    plaisio_codes = ["Νέα Ελληνικά [1]","Φυσική [38]","Βιολογία [21]","Χημεία [19]"]

    ranking = get_final_ranking(json.load(fin),plaisio_codes)
    sorted_ranking = sort_ranking(ranking)
    normalized_ranking = normalize(sorted_ranking)

    json.dump(normalized_ranking,fout,ensure_ascii=False,indent=2)