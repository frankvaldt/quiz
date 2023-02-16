from dataclasses import dataclass


@dataclass
class AnswerDto:
    text: str
    is_correct: bool


@dataclass
class QuizDto:
    answers: list[AnswerDto]
    question: str
    timer: int
    img: str


@dataclass
class QuizGroupDto:
    title: str
    quiz: list[QuizDto]
