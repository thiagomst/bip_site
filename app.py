from flask import Flask, render_template

app = Flask(__name__)

depoimentos = [
    {
        "nome": "Cliente 1",
        "perfil": "4/user.png",  # Caminho relativo (sem url_for aqui)
        "relato": "4/relato_01.jpeg",
        "grafico1": "4/grafico1.jpeg",
        "grafico2": "4/grafico2.jpeg"
    },
    {
        "nome": "Cliente 2",
        "perfil": "4/user.png",
        "relato": "4/relato_02.jpeg",
        "grafico1": "4/grafico3.jpg",
        "grafico2": "4/grafico4.jpeg"
    },
    {
        "nome": "Cliente 3",
        "perfil": "4/user.png",
        "relato": "4/relato_03.jpeg",
        "grafico1": "4/grafico5.jpeg",
        "grafico2": "4/grafico6.jpeg"
    }
]

@app.route('/')
def index():
    # Passa os depoimentos para o template
    return render_template("index.html", depoimentos=depoimentos)

if __name__ == '__main__':
    # Habilita o modo de depuração para facilitar o desenvolvimento
    app.run(debug=True, port=5500)