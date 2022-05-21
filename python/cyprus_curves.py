from math import *
import json
import numpy as np
from helpers import *

def initialize_lessons(candidates,plaisio):
    lessons = {}

    for lesson_name in plaisio.get_lessons():
        lessons[lesson_name] = Lesson(lesson_name,{})

    for candidate in candidates:
        if not plaisio.satisfy(candidate.grades.keys()):  # only consider candidates that satisfy the plaisio
            continue

        for lesson_name in plaisio.get_lessons():
            if lesson_name in candidate.grades:
                lessons[lesson_name].add_grade(candidate.id,candidate.grades[lesson_name])

    return lessons

def average_grades(grades):
    """
    Calculates average grade for each candidate.
    """

    result = {}
    count = {}

    for lesson_grades in grades.values():
        for candidate in lesson_grades:
            result[candidate] = result.get(candidate,0) + lesson_grades[candidate]
            count[candidate] = count.get(candidate,0) + 1

    for candidate in result:
        result[candidate] = result[candidate]/count[candidate]
    
    return result


def normalize(ranking):
    """
    Function that normalizes ranking grades (does not change order)
    """
    A = [8,11,13,15,17,19,20]   # ranges for grades
    p = [0,10,20,40,65,85,100]  # percentiles

    grades = [grade for code,grade in ranking]
    x = [np.percentile(grades,perc) for perc in p]  # grade corresponding to percentile

    print(x)
    print(len(grades))
    print()

    result = {}

    for code,grade in ranking:
        for i in range(len(A)-1):
            if grade <= x[i+1]:
                    result[code] = A[i] + (A[i+1] - A[i])*(grade - x[i])/(x[i+1] - x[i])
                    break

    return result

def get_ranking(candidates,plaisio):
    """
    Given a list of Candidate instances and
    an instance of Plaisio, returns a list
    of tuples (code,grade) of the final ranking.
    """

    lessons = initialize_lessons(candidates,plaisio)

    # curve grades for each lesson
    curved_grades = {}  # maps lesson name to dictionary of grades-candidates
    for lesson_name in lessons:
        if len(lessons[lesson_name].grades) > 0:
            curved_grades[lesson_name] = lessons[lesson_name].curve()
            
    avg_grades = average_grades(curved_grades)

    # sort by grade
    ranking = sorted(avg_grades.items(),key=lambda x:x[1],reverse=True)
    
    return normalize(ranking)   # normalize grades and return them


def parse_candidates(filename):
    """
    Parses a JSON file with candidates.
    """
    result = []
    with open(filename) as fin:
        candidates_data = json.load(fin)
        candidates_list = candidates_data["Candidates"]

        for candidate in candidates_list:
            grades = {}

            # Get the grades for each lesson
            for lesson in candidate:
                if lesson == "code":    # Skip the code
                    continue

                if candidate[lesson] == "" or "ΑΠΟΥΣΙΑ" in candidate[lesson]:   # Skip empty grades
                    continue

                lesson_name = candidate[lesson].split(":")[0]  # Get the lesson name
                lesson_grade = candidate[lesson].split(": ")[1] # Get the grade

                if float(lesson_grade) > 0: # skip zero grades
                    grades[lesson_name] = float(lesson_grade) *10  # Add the grade to the dictionary

            new_candidate = Candidate(candidate["code"],grades) # Create a new candidate
            result.append(new_candidate)    # Add the candidate to the list
    return result


def parse_plaisia(filename):
    """
    Parses a JSON file with plaisia.
    """
    result = []

    with open(filename) as fin:
        plaisia_data = json.load(fin)

        for code in plaisia_data:
            pl  = plaisia_data[code]
            result.append(Plaisio(pl["mandatory"],pl["optional"],pl["optionalNo"],code))

    return result



candidates = parse_candidates("./data/raw_data.json")
plaisia = parse_plaisia("./data/plaisia_cyprus.json")

for plaisio in plaisia:
    print(plaisio)
    ranking = get_ranking(candidates,plaisio)

    with open("./data/curves/plaisio_" + plaisio.id + ".json","w") as fout:
        json.dump(ranking,fout,ensure_ascii=False,indent=2)