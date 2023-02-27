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


@dataclass
class StatisticForOfficeDto:
    telegramId: str
    userName: str
    score: int
    time: int
    id: str


@dataclass
class StatisticDto:
    office: str
    scores: list[StatisticForOfficeDto]
