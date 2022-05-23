import json

from python.cyprus_curves import MIN_YEAR

MIN_YEAR = 2019
MAX_YEAR = 2022


for year in range(MIN_YEAR,MAX_YEAR+1):
    with open('./data/' + year + '/raw_data.json', 'r') as f:
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

                if lesson_name not in result:
                    result[lesson_name] = {}
                result[lesson_name][code] = lesson_grade
                

        with open('./data/' + year + '/lessons_data.json', 'w') as fout:
            json.dump(result, fout,ensure_ascii=False,indent=2)

