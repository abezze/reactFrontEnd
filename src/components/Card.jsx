function Card(props){
    const titolo = props.title;
    const desc = props.desc;
    const imgUrl = props.url;
    const visitata = props.isVisited;
    

    return(
        <>
            <div className="rounded-md" color="black">
                <p className="text-gray-500">{titolo}</p>
                <img src={imgUrl} width={100} height={100}></img>
            </div>
            <div>
                <p className="text-gray-500">{desc} </p>
            </div>
            {visitata ? 
            <span>V comprata </span>
            :
            <span>X Non comprata </span>
            }
        </>
    );
}

export default Card;