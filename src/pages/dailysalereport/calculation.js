

const varieties = (todaysSaleData) =>{
    return todaysSaleData.map((item) => {
        return item.selectedFoods.map((food) => {
          return food.selectedVariety;
        });
      });
}

export default varieties;

