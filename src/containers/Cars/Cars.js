import React, {useState, useEffect} from 'react';

import footballApi from "../../api/carsApi";

import classes from "./Cars.module.css";
import CarCard from "../../components/CarCard";


const Cars = () => {

  const [carBrands, setCarBrands] = useState([]);
  const [selectedCarBrandModels, setSelectedCarBrandModels] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCarBrand, setSelectedCarBrand] = useState("");
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);
  const [searchWord, setSearchWord] = useState("");
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: "Person1",
      purchasedCars: []
    },
    {
      id: 2,
      name: "Person2",
      purchasedCars: []
    },
    {
      id: 3,
      name: "Person3",
      purchasedCars: []
    },
  ]);


  useEffect(() => {
    footballApi.get('/GetMakesForVehicleType/car?format=json')
      .then(response => {
        setCarBrands(response.data.Results)
      })
  }, []);

  useEffect(() => {
    footballApi.get(`/getmodelsformake/${selectedCarBrand}?format=json`)
      .then(response => {
        setSelectedCarBrandModels(response.data.Results)
        setFilteredCars(response.data.Results)
        setSearchWord("")
      })
  }, [selectedCarBrand]);

  useEffect(() => {
    let newFilteredCars = [...selectedCarBrandModels];
    newFilteredCars = newFilteredCars.filter(c => c.Model_Name.toUpperCase().includes(searchWord.toUpperCase()))
    setFilteredCars(newFilteredCars)

  }, [searchWord])

  const onSelectedCarBrandChange = (e) => {
    setSelectedCarBrand(e.target.value)
  }

  const onSelectedPersonChange = (e) => {
    setSelectedPersonIndex(e.target.value)

  }

  const onBuyButtonClick = (brandModel) => {
    const newPersons = [...persons];
    newPersons[selectedPersonIndex].purchasedCars.push(brandModel)
    setPersons(newPersons);


  };

  const onRemoveButtonClick = (index) => {
    const newPersons = [...persons];
    newPersons[selectedPersonIndex].purchasedCars.splice(index, 1)
    setPersons(newPersons);
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Title}>
        <h1>Car Shop</h1>
      </div>
      <div className={classes.TopContainer}>
        <div className={classes.CarBrandsContainer}>
          <div>
            <h4>Choose Brand</h4>
          </div>
          <div className={classes.CarBrandsDropDown}>
            <select value={selectedCarBrand} onChange={e => onSelectedCarBrandChange(e)}>
              <option>{"Choose a car brand..."}</option>
              {carBrands.map(b => (
                <option value={b.MakeName}>{b.MakeName}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={classes.CarListTitleContainer}>
          <div className={classes.CarListTitle}>
            <h3>Cars purchased by {persons[selectedPersonIndex].name}</h3>
            <div className={classes.PersonsDropDown}>
              <select value={selectedPersonIndex} onChange={e => onSelectedPersonChange(e)}>
                {persons.map((p, index) => (
                  <option value={index}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.ContentContainer}>
        <div className={classes.CarModelsContainer}>
          <div>
            <h4>Purchase a car</h4>
          </div>
          <div className={classes.Search}>
            <label>Search: </label>
            <input value={searchWord} onChange={e => setSearchWord(e.target.value)} type="text"/>
            {filteredCars.map((brandModel) => (
              <CarCard buy={true} brandModel={brandModel} onBuyClick={onBuyButtonClick}/>
            ))}
          </div>
        </div>
        <div className={classes.CarListContainer}>
          <div className={classes.Search}>
            {persons[selectedPersonIndex].purchasedCars.map((brandModel, index) => (
              <CarCard index={index} brandModel={brandModel} onRemoveButtonClick={onRemoveButtonClick}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cars;
