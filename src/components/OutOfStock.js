const OutOfStock = () => {
  // className=" p-5 d-flex justify-content-center"
  return (
    <div style={{
      borderRadius: "50%", backgroundColor: "white", zIndex: "200",
      position: "relative", left: "30px", top: "110px", width: "100px",
      height: "100px", display: "flex", justifyContent: "center",
       alignItems: "center",
      }} className="out-of-stock" >
      <span>Out of <br /> stock</span>
    </div>
    )
}

export default OutOfStock;