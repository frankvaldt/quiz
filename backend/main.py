import asyncio
import sys
from os import path, getcwd

import typer
from flask import Flask, request
from flask_cors import cross_origin, CORS

from AdminPanel.backend.service.add_quiz_group import add_quiz_group, \
    get_quizzes_groups, delete_quizz_groups
from init import init_models

from flask import jsonify

sys.path.append(getcwd())
cli = typer.Typer()
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
# app = cors(app, allow_origin="*")

CORS(app)


@app.route("/")
@cross_origin()
async def hello1():
    return "Hello, World!"


@app.route('/getQuizGroup', methods=['GET'])
async def get_quiz_group_http():
    quizzes_groups = await get_quizzes_groups()
    return jsonify(quizzes_groups)


@app.route('/addQuizGroup', methods=['POST'])
async def add_quiz_group_http():
    req_data = request.get_json(force=True)
    quiz_group = req_data['quizGroup']
    await add_quiz_group(quiz_group)
    return quiz_group


@app.route('/updateQuizGroup', methods=['POST'])
async def update_quiz_group():
    req_data = request.get_json(force=True)
    quiz_group = req_data['quizGroup']
    return quiz_group


@app.route('/deleteQuizGroup', methods=['DELETE'])
async def delete_quiz_group():
    req_data = request.get_json(force=True)
    req_id = req_data['id']
    await delete_quizz_groups(req_id)
    return req_id


@cli.command()
def db_init_models():
    asyncio.run(init_models())
    print("Done")


if __name__ == '__main__':
    if __package__ is None:
        sys.path.append(path.dirname(path.dirname(path.abspath(__file__))))
    app.run(debug=True)
    # cli()
