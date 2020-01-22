import React from 'react';
import axios from 'axios';
import ItemsCard from '../components/ItemsCard';
import Header from '../components/Header';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {setItemId} from '../redux';

class Items extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            color : ["bg-brown", "bg-info", "bg-pitch", "bg-orange", "bg-pink", "bg-light"],
            itemsList : [],
            flag : false,
            toProduct : false,
            product :  '',
            url : '',
            buttonFlag : true
        }
    }

    handleCardClick = (id) => {
        this.props.setItemId(id);
        this.setState({
            toProduct : true
        })
    }
    
    componentDidMount= () => {
        axios.get(`http://192.168.40.170:8000/products/?category__name=${this.props.categoryData}&gender=${this.props.genderData}`)
        .then(res => {
            this.setState({
                itemsList : res.data.results,
                flag : true,
                url : res.data.next
            })

            if(res.data.next === null){
                this.setState({
                    buttonFlag : false     //If there is no next url then we remove load more button.
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    loadMore = (url) => {
        if(url === null){
            this.setState({
                buttonFlag : false     //If there is no next url then we remove load more button.
            })
        } else {
            // let position = url.indexOf('gender=') + 7; //getting index to append gender on the url.
            // let realUrl = [url.slice(0, position), this.props.genderData, url.slice(position)].join('');
            // console.log(realUrl)
            axios.get(url) 
            .then(res => {
                const newList = res.data.results;
                this.setState({
                    itemsList : [...this.state.itemsList, ...newList],
                    url : res.data.next
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    render () {
        if(this.state.toProduct === true){
            return <Redirect to= '/product'/>
        }

        const {color} = this.state;
        let newList = [];
        if(this.state.flag){
            newList = [...this.state.itemsList];
            newList.shift();
        }

        return (
            <>
            <Header heading={this.props.categoryData}/>
            {this.state.flag && 
            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <ItemsCard
                            id={this.state.itemsList[0].id}
                            click={this.handleCardClick} 
                            title={this.state.itemsList[0].name}
                            image={this.state.itemsList[0].images[0].image} 
                            background={color[Math.floor(Math.random()*color.length)]}
                        />
                    </div>
                </div>

                <div className="row">
                {
                    newList.map(item =>{
                        if(item.images.length > 0)
                        return(
                        <div key={item.id} className="col-6">
                            <ItemsCard
                                id={item.id}
                                click={this.handleCardClick}
                                title={item.name}
                                image={item.images[0].image} 
                                background={color[Math.floor(Math.random()*color.length)]}
                            />
                        </div>
                        )
                        return null
                    })
                }
                </div>
                {this.state.buttonFlag && <button 
                    className="btn btn-primary" 
                    onClick={() => this.loadMore(this.state.url)}
                >
                    Load More
                </button>}
            </div>
            }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        genderData : state.home.gender,
        categoryData : state.var.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setItemId : (id) => dispatch(setItemId(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Items);