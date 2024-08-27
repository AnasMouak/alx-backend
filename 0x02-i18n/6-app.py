#!/usr/bin/env python3
"""Use user locale"""
from flask import Flask, render_template, request, g
from flask_babel import Babel

app = Flask(__name__)


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """Represents a Flask Babel configuration."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


babel = Babel(app)


def get_user():
    """Retrieves a user based on a user id."""
    user_id = request.args.get('login_as')
    if user_id:
        user_id = int(user_id)
        return users.get(user_id)
    return None


@app.before_request
def before_request():
    """find a user if any, and set it as a global on flask.g.user"""
    g.user = get_user()


@babel.localeselector
def get_locale():
    """Get the best match for supported languages from the request headers"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale

    if g.user and g.user.get("locale") in app.config['LANGUAGES']:
        return g.user["locale"]

    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index() -> str:
    """index page"""
    return render_template('6-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
