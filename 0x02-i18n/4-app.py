#!/usr/bin/env python3
"""Force locale with URL parameter"""
from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)


class Config:
    """Represents a Flask Babel configuration."""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app.config.from_object(Config)


babel = Babel(app)


@babel.localeselector
def get_locale():
    """Get the best match for supported languages from the request headers"""
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'],
                                               default='en')


@app.route('/')
def index() -> str:
    """index page"""
    return render_template('4-index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
