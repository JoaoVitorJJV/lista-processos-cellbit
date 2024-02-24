import './App.css';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import data from "../src/data/data.json";

function App() {
  const [nick, setNick] = useState();
  const [modal, setModal] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const [listOccurencies, setListOccurencies] = useState([])

  const toggleModal = () => setModal(!modal);

  const onText = (text) => {
    setNick(text);
    setListOccurencies([]);
    setIsInList(false);
    const serializeText = text.replace(/@/g, '');
    const list = data;

    const filterName = list.filter(l => l.profile === serializeText);

    if (filterName.length > 0) {
      setIsInList(true);
      setListOccurencies(filterName);
    }

  }


  return (
    <div className="App">
      <header className="App-header">
        <div style={{ marginBottom: 35 }}>
          <span style={isInList ? { color: 'red', fontWeight: 'bold' } : { color: 'green', fontWeight: 'bold' }}>
            {isInList ? (
              <>
                {listOccurencies.length > 1 && (
                  <>
                    <span className="title">Seu nome está na lista, nas posições: {listOccurencies.map(ocurrency => `${ocurrency.order}) `)}</span>
                  </>
                )}
              </>
            ) : (nick && <span className="title">Seu nome não está na lista, parabéns!</span>)}
          </span>
          <br /><br />
          {isInList && (
            <>
              <span>Nome:&nbsp;
                <a
                  href={`https://x.com/${listOccurencies[0].profile}`}
                  target='_blank'
                  rel="noreferrer"
                >
                  {listOccurencies[0].profile}
                </a>
              </span>
              <br />
              <span>Links:</span><br />
              {listOccurencies.map((links, i) => (
                <div>
                  <a href={links.link} target='_blank' rel="noreferrer">{links.link}</a><br />
                </div>
              ))}
            </>
          )}


        </div>
        <p>
          Insira seu @ e veja se seu nome está na lista!
        </p>
        <input
          type="text"
          style={{ padding: 5, outline: 'none', width: '40%' }}
          placeholder='Insira seu @ aqui!'
          onChange={e => onText(e.target.value)}
        />

        <Button style={{ marginTop: 30 }} color="success" onClick={toggleModal}>
          Ver Lista
        </Button>

        <Modal scrollable={true} isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Lista de Processados pelo Cellbit</ModalHeader>
          <ModalBody>
            <Table
              responsive={true}
            >
              <thead>
                <tr>
                  <th>
                    #
                  </th>
                  <th>
                    Nome
                  </th>
                  <th>
                    Perfil
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((links, i) => (
                  <tr key={i}>
                    <th scope="row">
                      {links.order}
                    </th>
                    <td>
                      {links.profile}
                    </td>
                    <td>
                      {links.link}
                    </td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </header>
      <footer
        style={{ backgroundColor: '#282c34', color: 'white', marginTop: -40 }}
      >
        &copy; - 2024 Lista atualizada em: 23/02/2024 às 23:52
      </footer>
    </div>
  );
}

export default App;
