import './App.css';
import React from "react";
import TicketList from "./ticketList";
import FoodList from "./foodList";
import Calculator from "./Mincovka";
import Souhrn from "./Souhrn";
import Rezervace from "./Rezervace";
import {HashRouter as Router, Route, Switch, Link} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Login from "./Login";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function App() {
    // Seznam prvků na účtenku
    const [ticketList, setTicketList] = React.useState([]);

    // Celková cena účtenky
    const [ticketPrice, setTicketPrice] = React.useState(0);
    const [ticketPriceNoDph, setTicketPriceNoDph] = React.useState(0);

    // Ukládá cenu před slevou pro případ zrušení slevy
    const [beforeDiscount, setBeforeDiscount] = React.useState(0);


    // Základní verze našeho jídelníčku
    const [foodList, setFoodList] = React.useState([
          { id: 1, name: 'Smažený sýr', price_dph: 170, dph: 0.12, type: "Jídlo" },
          { id: 2, name: 'Kuřecí řízek', price_dph: 200, dph: 0.12, type: "Jídlo" },
          { id: 3, name: 'Vepřový řízek', price_dph: 190, dph: 0.12, type: "Jídlo" },
          { id: 4, name: 'Kuřecí vývar', price_dph: 35, dph: 0.12, type: "Polévka" },
          { id: 5, name: 'Klobása', price_dph: 48, dph: 0.12, type: "Jídlo" },
          { id: 6, name: 'Tatarka', price_dph: 30, dph: 0.12, type: "Příloha" },
          { id: 7, name: 'Obal na jídlo', price_dph: 6, dph: 0.21, type: "Příloha" },
          { id: 8, name: 'Hranolky', price_dph: 75, dph: 0.12, type: "Příloha" },
          { id: 9, name: 'Gambrinus 10', price_dph: 28, dph: 0.21, type: "Alkohol" },
      ]);

    // Seznam s rezervacemi
    const [reservationList, setReservationList] = React.useState([])
    // Funkce pro update rezervací
    function updateReservationList(updatedList) {
        setReservationList(updatedList)
    }

    // Věci do souhrnu
    const [fullCash, setFullCash] = React.useState(0);
    const [fullCashNoDph, setFullCashNoDph] = React.useState(0);
    const [fullCard, setFullCard] = React.useState(0);
    const [fullCardNoDph, setFullCardNoDph] = React.useState(0);
    const [fullCashDiscount, setFullCashDiscount] = React.useState(0);
    const [fullCardDiscount, setFullCardDiscount] = React.useState(0);
    const [soldItems, setSoldItems] = React.useState([]);
    const [cashTicketsAmount, setCashTicketsAmount] = React.useState(0);
    const [cardTicketsAmount, setCardTicketsAmount] = React.useState(0);

    // Funkce pro resetování stavu po uzávěrce
    const Reset = () => {
        setFullCash(0)
        setFullCashNoDph(0)
        setFullCard(0)
        setFullCardNoDph(0)
        setFullCashDiscount(0);
        setFullCardDiscount(0);
        setSoldItems([]);
        setCashTicketsAmount(0);
        setCardTicketsAmount(0);
    }

    // Stav popUp položky
    const [triger, setTriger] = React.useState(false);

    // Položky pro vytvoření jídla
    const [foodName, setFoodName] = React.useState("");
    const [foodType, setFoodType] = React.useState("");
    const [foodPrice, setFoodPrice] = React.useState(0);
    const [foodDPH, setFoodDPH] = React.useState(0);

    //
    function updateTicketList(updatedList) {
        if(ticketList.some(obj => obj.id === updatedList.id)) {
            const alrIndex = ticketList.findIndex(obj => obj.id === updatedList.id)
            const newTicketList = [...ticketList]
            newTicketList[alrIndex].amount = newTicketList[alrIndex].amount + 1
            console.log(newTicketList)
            changeTicketPrice(newTicketList)
            setTicketList(newTicketList)
        }
        else {
            updatedList.amount = 1
        const newTicketList =[...ticketList, updatedList]
            console.log(newTicketList)
            changeTicketPrice(newTicketList)
            setTicketList(newTicketList)
        }
    }

    // Funkce, která aktualizuje cenu účtenky
    function changeTicketPrice(data) {
        let new_price = 0;
        let new_price_no_dph = 0;
        for (let x = 0; x < data.length; x++) {
            console.log(data[x].price_dph);
            new_price = new_price + data[x].price_dph*10*data[x].amount;
            new_price_no_dph = new_price_no_dph + (((data[x].price_dph*100* data[x].amount / ((1 + data[x].dph)*100))).toFixed(2)*1)*100
        }
        setTicketPrice(new_price/10)
        setTicketPriceNoDph(new_price_no_dph/100)
    }

    // Funkce, která přidá slevu do TicketPrice
    function addDiscount(value) {
        let new_price = ticketPrice*10
        new_price = new_price - value*10 + beforeDiscount*10
        setTicketPrice(new_price/10)
        setBeforeDiscount(value)
    }

    // Funkce, která odstraní věci z TicketListu, kdybychom se překlikli
    function handleDelete(data) {
        setTicketList(data)
        changeTicketPrice(data)
    }

    // Pokud se z edituje položka na účtence, přepíše se celá data
    function handleChangeAmount(data) {
        setTicketList(data)
        changeTicketPrice(data)
    }


    // Funkce, pro změnu DPH nové položky
    let [selectorValue, setSelectorValue] = React.useState([])
    function handleDPHChange(event) {
        setFoodDPH(event.target.value[0]);
        setFoodType(event.target.value[1]);
        setSelectorValue([event.target.value[0], event.target.value[1]]);
    }

    // Funkce, pro zpracování objednávky
    function handleTicketSale(type, discountValue) {
        if (ticketList.length != 0) {
        if(type == "card") {
            setCardTicketsAmount(cardTicketsAmount + 1);
            setFullCard(fullCard + ticketPrice);
            setFullCardNoDph(fullCardNoDph + ticketPriceNoDph)
            setFullCardDiscount(fullCardDiscount + discountValue);
        }
        else if (type == "cash") {
            setCashTicketsAmount(cashTicketsAmount + 1);
            setFullCash(fullCash + ticketPrice);
            setFullCashNoDph(fullCashNoDph + ticketPriceNoDph)
            setFullCashDiscount(fullCashDiscount + discountValue);
        }
        let itemsUpdate = [...soldItems];
        itemsUpdate.push(ticketList)
        setSoldItems(itemsUpdate)
        console.log(itemsUpdate)
        setTicketList([]);
        setTicketPrice(0);
        setTicketPriceNoDph(0);
        }
        else {
            alert("Záporná hodnota v pokladně!")
        }
    }

    // Smaže položku ze seznamu
    function deleteItemFromList(id) {
        let newList = []
        for (let x in foodList) {
            if(foodList[x].id != id) {
                newList.push(foodList[x])
            }
        }
        setFoodList(newList)
    }

    // Přidá položku do seznamu
    const handleSubmit = () => {
        let newID = 0
        if (foodName && foodType && foodPrice && foodDPH) {
            if(foodList.length != 0) {
                 newID= foodList[foodList.length-1].id + 1
            }
            else {
                 newID = 1
            }
            const newFood = {
                id: newID,
                name: foodName,
                price_dph: Number(foodPrice),
                dph: Number(foodDPH) / 100,
                type: foodType
            };
            setFoodList([...foodList, newFood]);
            setFoodName("");
            setFoodType("");
            setFoodPrice(0);
            setFoodDPH(0);
            setTriger(false);
        }
        else if (foodName == "") {
            alert("Zadejte název nové položky!")
        }
        else if (foodType == "") {
            alert("Zadejte typ nové položky!")
        }
        else if (foodPrice <= 0) {
            alert("Zadejte validní cenu nové položky!")
        }
    };


  return (
      <Router>
      <div className="App">
          <Switch>
              <Route exact path="/">
                  <Login />
              </Route>
              <Route path="/home">
                  <header className="App-header">
                      <div className="nav">
                          <ul  style={{height: "70px"}}>
                              <li><Link to="/home/pokladna" className="link-styles">Pokladna</Link></li>
                              <li><Link to="/home/rezervace" className="link-styles">Rezervace</Link></li>
                              <li><Link to="/home/calculator" className="link-styles">Mincovka</Link></li>
                              <li><Link to="/home/souhrn" className="link-styles">Souhrn</Link></li>
                              <li><Link to="/" className="link-styles"><LogoutIcon></LogoutIcon></Link></li>
                          </ul>
                      </div>
                    <Switch>
                      <div className="container">

                          <Route path="/home/pokladna">
                              <div className="menu">
                                  <div className="menu-category">

                                      <FoodList
                                          hoover={updateTicketList}
                                          rows={foodList}
                                          deleteItem={deleteItemFromList}
                                      />
                                      <div>
                                          <button onClick={() => setTriger(true)} className="button"
                                                  style={{width: "20%", marginTop: "1%"}}>
                                              Vytvořit novou položku
                                          </button>
                                          {triger && (
                                              <div className="popup-container">
                                                  <div className="popup-inner">
                                                      <h3 className="popup-heading">Nová položka do jídelního
                                                          seznamu:</h3>
                                                      <input
                                                          type="text"
                                                          className="popup-input"
                                                          placeholder="Název položky"
                                                          value={foodName}
                                                          onChange={(e) => setFoodName(e.target.value)}
                                                      />
                                                      <h6 className="popup-heading" style={{
                                                          marginTop: "2.5%",
                                                          marginBottom: "2.5%",
                                                          fontSize: "80%"
                                                      }}>Druh jídla:</h6>
                                                      <Select
                                                          labelId="demo-simple-select-standard-label"
                                                          id="demo-simple-select-standard"
                                                          value={selectorValue}
                                                          onChange={handleDPHChange}
                                                          sx={{width: "100%", color: "black"}}
                                                      >
                                                          <MenuItem value={[12, "Jídlo"]}>Jídlo</MenuItem>
                                                          <MenuItem value={[12, "Voda, mléko atd"]}>Nápoje typu voda, mléko atd (12 %)</MenuItem>
                                                          <MenuItem value={[21, "Nealkoholické nápoje"]}>Nealkoholické nápoje (21 %)</MenuItem>
                                                          <MenuItem value={[12, "Dezert"]}>Dezert</MenuItem>
                                                          <MenuItem value={[12, "Polévka"]}>Polévka</MenuItem>
                                                          <MenuItem value={[12, "Příloha"]}>Příloha</MenuItem>
                                                          <MenuItem value={[21, "Alkohol"]}>Alkohol</MenuItem>
                                                          <MenuItem value={[21, "Ostatní"]}>Ostatní</MenuItem>
                                                      </Select>
                                                      <input
                                                          type="text"
                                                          className="popup-input"
                                                          placeholder="DPH (%)"
                                                          disabled={true}
                                                          value={`${foodDPH} %`}
                                                          onChange={(e) => setFoodDPH(e.target.value)}
                                                      />
                                                      <h6 className="popup-heading" style={{
                                                          marginTop: "2.5%",
                                                          marginBottom: "2.5%",
                                                          fontSize: "80%"
                                                      }}>Prodejní cena v Kč:</h6>
                                                      <input
                                                          type="number"
                                                          className="popup-input"
                                                          placeholder="Cena"
                                                          value={foodPrice}
                                                          onChange={(e) => setFoodPrice(e.target.value)}
                                                      />
                                                      <div className="popup-buttons">
                                                          <button onClick={() => setTriger(false)}
                                                                  className="popup-button popup-cancel">Zrušit
                                                          </button>
                                                          <button onClick={handleSubmit}
                                                                  className="popup-button popup-add">Přidat
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              </div>
                              <TicketList
                                  ticketData={ticketList}
                                  priceValue={ticketPrice}
                                  priceValueNoDph={ticketPriceNoDph}
                                  hooverDiscount={addDiscount}
                                  hooverDelete={handleDelete}
                                  hooverAmount={handleChangeAmount}
                                  hooverSale={handleTicketSale}
                              />
                          </Route>
                          <Route path="/home/calculator">
                              <Calculator/>
                          </Route>
                          <Route path="/home/souhrn">
                              <Souhrn
                                  fullCash={fullCash}
                                  fullCard={fullCard}
                                  fullCashNoDph={fullCashNoDph}
                                  fullCardNoDph={fullCardNoDph}
                                  fullCashDiscount={fullCashDiscount}
                                  fullCardDiscount={fullCardDiscount}
                                  soldItems={soldItems}
                                  cashTicketAmount={cashTicketsAmount}
                                  cardTicketAmount={cardTicketsAmount}
                                  resetFunction={Reset}
                              />
                          </Route>
                          <Route path="/home/rezervace">
                              <Rezervace
                              reservationList={reservationList}
                              handleUpdate={updateReservationList}
                              />
                          </Route>
                      </div>
                    </Switch>
                  </header>
              </Route>
          </Switch>
      </div>
      </Router>
  );
}

export default App;
