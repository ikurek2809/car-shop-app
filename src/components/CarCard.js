import React from 'react';
import classes from "./CarCard.module.css";


const CarCard = props => (
  <div className={classes.CarCard}>
    <div className={classes.CarCardTitle}>
      <h3>{props.brandModel.Make_Name + " " + props.brandModel.Model_Name}</h3>
    </div>
    {props.buy ?
      <div onClick={() => props.onBuyClick(props.brandModel)} className={classes.CarCardButton}>
        <div>BUY</div>
      </div>
      :
      <div onClick={() => props.onRemoveButtonClick(props.index)} className={classes.RemoveButton}>
        <div>X</div>
      </div>
    }
  </div>
);


export default CarCard
