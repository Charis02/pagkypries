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

class Candidate:
    """
    Represents a candidate. It is characterized
    by an id, a list of classes, a list of plaisia that
    the candidate's classes satisfty,and a dictionary 
    of grades for each class.
    """

    def __init__(self,id,classes,grades):
        self.classes = classes
        self.id = id
        self.grades = grades
        self.plaisia = []
        self.plaisia_grades = {}

    def __str__(self):
        return "Υποψήφιος {}".format(self.id)

    def find_applicable_plaisia(self,plaisia):
        """
        Given a list of plaisia, returns a list of
        plaisia that the candidate's classes satisfy.
        """
        applicable = []
        for plaisio in plaisia:
            if plaisio.satisfy(self.classes):
                applicable.append(plaisio)
        return applicable

    def set_applicable_plaisia(self,plaisia):
        """
        Given a list of plaisia, sets the plaisia
        that the candidate's classes satisfy.
        """
        self.plaisia = self.find_applicable_plaisia(plaisia)

dummy_plaisio = Plaisio(["Μαθηματικά","Φυσική"],["Χημεία","Βιολογία"],1,32)
print(dummy_plaisio)

dummy_candidate = Candidate(1,["Μαθηματικά","Φυσική","Χημεία","Βιολογία"],{})
print(dummy_candidate)