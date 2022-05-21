import math

class Plaisio:
    """
    Represents a 'plaisio' of lessons. It is
    characterized by a list of mandatory lessons,
    a list of optional lessons, how many optional
    lessons must be chosen, and an id number.
    """

    def __init__(self,mandatory,optional,required,id):
        self.mandatory = mandatory
        self.optional = optional
        self.requiredNumber = required
        self.id = id

    def __str__(self):
        return "Πλάισιο {}:\n\tΑπαιτούμενα: {}\n\tΠροαιρετικά: {}\n\tΠρέπει να επιλαγούν {} προεραιτικά μαθήματα".format(self.id,', '.join(self.mandatory),', '.join(self.optional),self.requiredNumber)

    def satisfy(self,classes):
        """
        Given a list of classes, returns True if
        the plaisio is satisfied, False otherwise.
        """
        return len(set(self.mandatory).intersection(classes)) == len(self.mandatory) and len(set(self.optional).intersection(classes)) >= self.requiredNumber

    def get_lessons(self):
        """
        Returns a list of all the lessons that are
        in this plaisio.
        """
        return self.mandatory + self.optional
    
    def total_lessons(self):
        """
        Returns a list of all the lessons that are
        in this plaisio, but not in the optional
        list.
        """
        return len(self.mandatory)+self.requiredNumber

    def get_mandatory(self):
        """
        Returns a list of all the mandatory lessons
        in this plaisio.
        """
        return self.mandatory
    
    def get_optional(self):
        """
        Returns a list of all the optional lessons
        in this plaisio.
        """
        return self.optional

class Candidate:
    """
    Represents a candidate. It is characterized
    by an id, and a dictionary of grades for each class.

    The plaisia are set by the set_applicable_plaisia method.
    """

    def __init__(self,id,grades):
        self.id = id
        self.grades = grades

    def __str__(self):
        return "Υποψήφιος {}".format(self.id)

    def find_applicable_plaisia(self,plaisia):
        """
        Given a list of plaisia, returns a list of
        plaisia that the candidate's classes satisfy.
        """
        applicable = []
        for plaisio in plaisia:
            if plaisio.satisfy(self.grades.keys()):
                applicable.append(plaisio)
        return applicable

class Lesson:
    """
    Represents a lesson. It is characterized by
    a name and a dictionary of grades for each candidate.

    The calculation of the average grade is done by the
    get_average_grade method, and the calculation of the
    standard deviation is done by the get_standard_deviation
    method.

    The method curve is used to calculate the grade of
    each candidate in this lesson.
    """

    def __init__(self,name,grades):
        self.name = name
        self.grades = grades

    def __str__(self):
        return self.name

    def add_grade(self,cand,grade):
        """
        Adds a grade to the lesson.
        """
        self.grades[cand] = grade

    def f(self,x):
        """
        Processes the grade of a candidate, as described
        in the paper.
        """
        try:
            return math.log10(x/(201-x))
        except:
            print("AAA",x)

    def get_average_grade(self):
        """
        Returns the average grade for this lesson, after
        applying transformation f on each grade.
        """
        temp_grades = [self.f(self.grades[cand]) for cand in self.grades]
        return sum(temp_grades)/len(temp_grades)

    def get_standard_deviation(self):
        """
        Returns the standard deviation for this lesson, after
        applying transformation f on each grade.
        """
        temp_grades = [self.f(self.grades[cand]) for cand in self.grades]
        avg = sum(temp_grades)/len(temp_grades)
        return math.sqrt(sum([(x-avg)**2 for x in temp_grades])/len(temp_grades))

    def curve(self):
        """
        Returns a dictionary of curved grades for each candidate.
        """
        avg = self.get_average_grade()
        std = self.get_standard_deviation()

        result = {}
        for cand in self.grades:
            result[cand] = 10+3*(self.f(self.grades[cand]) - avg)/std

        return result

    def get_candidates(self):
        """
        Returns a list of all the candidates that have
        a grade for this lesson.
        """
        return list(self.grades.keys())
        