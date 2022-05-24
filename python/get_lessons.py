import json

MIN_YEAR = 2019
MAX_YEAR = 2022

def compFunc(x):
    try:
        return float(x['grade'])
    except:
        return -1

for year in range(MIN_YEAR,MAX_YEAR+1):
    with open('./data/' + str(year) + '/raw_data.json', 'r') as f:
        data = json.load(f)

        result = {}

        for candidate in data['Candidates']:
            cand_iter = iter(candidate)
            code = candidate[next(cand_iter)]

            for lesson in cand_iter:
                lesson_name = candidate[lesson].split(':')[0]

                try:
                    lesson_grade = candidate[lesson].split(': ')[1]
                except:
                    lesson_grade = "ΑΠΟΥΣΙΑ"
                
                if lesson_name == "":
                    continue
                if lesson_grade == "ΑΠΟΥΣΙΑ":
                    continue

                if lesson_name not in result:
                    result[lesson_name] = []
                result[lesson_name].append({'code':code,'grade':lesson_grade})
        
        for lesson in result:
            result[lesson] = sorted(result[lesson], key=compFunc,reverse=True)

            last = 22
            rank = 0
            
            for i in range(len(result[lesson])):
                if result[lesson][i]['grade'] != last:
                    rank = i + 1
                    last = result[lesson][i]['grade']

                result[lesson][i]['rank'] = rank

                

        with open('./data/' + str(year) + '/lessons_data.json', 'w') as fout:
            json.dump(result, fout,ensure_ascii=False,indent=2)

