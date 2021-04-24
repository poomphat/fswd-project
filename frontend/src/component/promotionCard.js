

const PromotionCard = (props) =>{
        const item = props?.data
        
        return (
            <div className="col-lg-6 col-sm-12 ml-3 mr-3 row mainnaja" data-aos="fade-up" data-aos-delay={200*(props.index+1)}>
                <div className="headborder bg-dark text-light col-4">
                    <p className="mb-1 textsmall">promotion</p>
                    <h6 className="boldhead">Discount {item?.promotionName}</h6>
                </div>
                <div class="bg-light col-8 bodyborder">  
                <h6 className="boldhead mb-1">{item?.disProduct?.productName}</h6>{console.log(item)}
                <hr/>
                <h8 className="mb-1">normal price : {item?.disProduct?.price} USD</h8>
               
                    <div className="flexbe row pr-3 pl-3"> 
                        <h5 className="boldhead mb-0 totaltext mt-2">Total : {Math.floor(item?.disProduct?.price/((100+item?.discountInPercent)/100))} USD</h5>
                        <button class="btn btn-dark ml-2">Buy</button>
                    </div>
                </div>
            </div>
        );
}

export default PromotionCard 