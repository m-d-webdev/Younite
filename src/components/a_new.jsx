import React from 'react'
import {Link} from 'react-router-dom'


function A_new({ the_new }) {
    return (
        <Link to={the_new.url} target='_blank' className='p15 wmia c-s-s mt20'>
            <div className="psr NewImgContainer wmia c-s-s">
                <img src={the_new.urlToImage != null ? the_new.urlToImage :"https://i.pinimg.com/736x/b2/a7/8b/b2a78b7520577fc3664213e22bffd2c3.jpg"} alt="" />
                <h1>
                    {the_new.title}
                </h1>
            </div>
            <p className='mt10 fw900  ml10'>{the_new.description}</p>
            <p className='mt10 hoverEff2'> Source : {the_new.source.name}</p>
        </Link>
    )
}

export default A_new
