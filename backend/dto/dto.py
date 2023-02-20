from dataclasses import dataclass


@dataclass
class AnswerDto:
    text: str
    isCorrect: bool
    id: str
    idQuiz: str


@dataclass
class QuizDto:
    answers: list[AnswerDto]
    question: str
    timer: int
    img: str
    id: str
    idQuizGroup: str


@dataclass
class QuizGroupDto:
    title: str
    quiz: list[QuizDto]
    id: str
