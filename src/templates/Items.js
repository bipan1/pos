import React from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';

class Items extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            color : ["bg-brown", "bg-info", "bg-pitch", "bg-orange", "bg-pink", "bg-light"],
            itemsList : [],
            flag : false,
            toProduct : false
        }
    }

    handleCardClick = () => {
        this.setState({
            toProduct : true
        })
    }
    
    componentDidMount= () => {
        axios.get(`api_root_address ${this.props.location.state.category}`)
        .then(res => {
            this.setState({
                itemsList : res.data,
                flag : true
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    render () {
        // if(this.state.toProduct === true){
        //     return <Redirect to={{
        //         pathname : './product',
        //         state : {
        //             productId : id
        //         }
        //     }}/>
        // }
        const [color] = this.state;
        let newList = [];
        newList = [...this.state.itemsList];
        newList.shift();

        return (
            <>
            <Header/>
            {this.state.flag && 
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <CategoryCard click={this.handleCardClick} title={this.state.itemsList[0].item} image={this.state.itemsList[0].image} 
                        background={color[Math.floor(Math.random()*color.length)]}/>
                    </div>
                </div>

                <div className="row">
                    {
                    newList.map(item =>{
                        return(
                        <div className="col-6">
                            <CategoryCard title={item.category} image={item.image} 
                            background={color[Math.floor(Math.random()*color.length)]}/>
                        </div>
                        )
                    })
                    }
                </div>
            </div>
            }
            </>
        )
    }
}

export default Items;