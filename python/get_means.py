import json

MIN_YEAR = 2019
MAX_YEAR = 2022


for year in range(MIN_YEAR,MAX_YEAR+1):
    with open('./data/' + str(year) + '/raw_data.json', 'r') as f:
        data = json.load(f)

        result = {'Candidates':[]}

        for candidate in data['Candidates']:
            cand_iter = iter(candidate)
            code = candidate[next(cand_iter)]
            score = 0
            cnt = 0

            for lesson in cand_iter:
                lesson_name = candidate[lesson].split(':')[0]

                try:
                    lesson_grade = candidate[lesson].split(': ')[1]
                except:
                    lesson_grade = "ΑΠΟΥΣΙΑ"
                
                if lesson_name == "" or lesson_grade == "ΑΠΟΥΣΙΑ":
                    continue

                score += float(lesson_grade)
                cnt += 1

            if cnt == 0:
                result['Candidates'] . append([code, 0])
            else:
                result['Candidates'] . append([code, score/cnt])

        result['Candidates'].sort(key=lambda x: x[1], reverse=True) # sort by descending grades

        rank = 0
        last = 21

        for i in range(len(result['Candidates'])):
            if result['Candidates'][i][1] != last:
                rank = i + 1
                last = result['Candidates'][i][1]

            result['Candidates'][i].append(result['Candidates'][i][1])
            result['Candidates'][i][1] = rank

        with open('./data/' + str(year) + '/means_data.json', 'w') as fout:
            json.dump(result, fout,ensure_ascii=False,indent=2)

