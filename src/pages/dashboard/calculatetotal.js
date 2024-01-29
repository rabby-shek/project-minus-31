const calculatetotal = (selectedFoods, discount, setTotal) => {
  const subtotal = selectedFoods.reduce((acc, food) => {
    const variety = food.varieties.find((v) => v.name === food.selectedVariety);
    return acc + (variety ? variety.price * food.quantity : 0);
  }, 0);

  const discountedTotal = subtotal - discount;
  const finalTotal = discountedTotal < 0 ? 0 : discountedTotal;

  setTotal(finalTotal);
};

export default calculatetotal;
