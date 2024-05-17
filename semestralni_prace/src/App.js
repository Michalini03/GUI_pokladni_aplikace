import './App.css';
import React from "react";
import ticketList from "./ticketList";
import TicketList from "./ticketList";

// eslint-disable-next-line react-hooks/rules-of-hooks


function App() {
  const [price, setPrice] = React.useState()
  const [food, setFood] = React.useState()
  const [drinks, setDrinks] = React.useState();
  const [ticketList, setTicketList] = React.useState();


  function updateTicketList(updatedList) {
      setTicketList(updatedList)
  }

  return (
      <div className="App">
          <header className="App-header">
              <div className="nav">
                  <ul>
                      <li><button>Snídaně</button></li>
                      <li><button>Oběd</button></li>
                      <li><button>Oběd</button></li>
                      <li><button>Oběd</button></li>
                      <li><button>Oběd</button></li>
                  </ul>
              </div>

              <div className="container">
                  <div className="menu">
                      <div className="menu-category">

                      </div>
                  </div>
                      <TicketList
                      ticketData={ticketList}
                      />
              </div>
          </header>
      </div>
  );
}

export default App;
