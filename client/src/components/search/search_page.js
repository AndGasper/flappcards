import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import {green500} from 'material-ui/styles/colors';
import SearchAutoComplete from './search_autocomplete';
import FlashCardsAppBar from '../appBar/app_bar_with_drawer';
import {searchStacks, populateAutoComplete, unmountSearch} from '../../actions/index'

class Search extends Component {

    componentWillMount(){
        document.body.style.backgroundColor="#f0f0f0";
        document.title="FlappCards - Search Page";
        console.log("search will mount",this.props.location);
        //search/?q=term
        if(this.props.location.query){
            console.log('term is true',this.props.location.query);
        }
    }
    // componentWillReceiveProps(nextProps){
    //     console.log('search receiveing next this',this.props);
    //     console.log('searh will receive props',nextProps);
    // }

    componentWillUnmount(){
        this.props.unmountSearch();
    }

    renderStacksList(){
        return this.props.searched.map((item, index) => {
            return (
                <TableRow key={index} className="tableStyle">
                    <TableRowColumn className="tableSubj">{item.subject}: {item.category}</TableRowColumn>
                    <TableRowColumn className="tableStyle tableHidden">{item.orig_source_stack}</TableRowColumn>
                    <TableRowColumn className="tableStyle">{item.totalCards}</TableRowColumn>
                    <TableRowColumn className="tableStyle tableHidden">{item.rating}</TableRowColumn>
                    <TableRowColumn className="tableStyle">
                        <IconButton
                            containerElement={<Link to={`/stackOverview/${this.props.searched[index].stack_id}`}
                                                    name="stackOverview"/>}>
                            <RemoveRedEye hoverColor={green500}/>
                        </IconButton>
                    </TableRowColumn>
                </TableRow>
            )
        });
    }

    render(){
        console.log('search render',this.props);

        const tableHead = (
            <Table>
                <TableHeader displaySelectAll={false}  adjustForCheckbox={false}>
                    <TableRow style={{backgroundColor:"white"}}>
                        <TableHeaderColumn style={{textAlign:"center"}}>Title</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:"center"}}>Total Cards</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:"center"}}>Total Views</TableHeaderColumn>
                        <TableHeaderColumn style={{textAlign:"center"}}>See More</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                </TableBody>
            </Table>
        );

        if(!this.props.searched) {
            return (
                <div>
                    <FlashCardsAppBar/>
                    <Paper style={{
                        textAlign: "center",
                        padding: "1em",
                        margin: "2em",
                        backgroundColor:"white",
                    }}>
                        <SearchAutoComplete />
                        {tableHead}
                        <p>
                            Search the available stacks by Category or Subject and click on "see more" to browse the selected result!
                        </p>
                    </Paper>
                </div>
            )
        }else if(this.props.searched) {
            if(this.props.searched.length > 0){
                return (
                    <div>
                        <FlashCardsAppBar/>
                        <Paper style={{"textAlign": "center" ,"padding": "1em", "margin":"2em","backgroundColor":"white"}}>
                            <SearchAutoComplete />


                            <Table className="tableStyle">
                                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                                    <TableRow style={{backgroundColor:"white"}}>
                                        <TableHeaderColumn style={{textAlign:"center"}}>Title</TableHeaderColumn>
                                        <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Creator</TableHeaderColumn>
                                        <TableHeaderColumn style={{textAlign:"center"}}>Total Cards</TableHeaderColumn>
                                        <TableHeaderColumn className="tableHidden" style={{textAlign:"center"}}>Total Views</TableHeaderColumn>
                                        <TableHeaderColumn style={{textAlign:"center"}}>See More</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody style={{backgroundColor:"white"}} displayRowCheckbox={false}>
                                    {this.renderStacksList.bind(this)()}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                )
            }else{
                return (
                    <div>
                        <FlashCardsAppBar/>
                        <Paper style={{"textAlign":"center","padding":"1em","margin":"2em"}}>
                            <SearchAutoComplete />
                            {tableHead}
                            <p>
                                We&apos;re sorry, we found 0 stacks matching that search.
                            </p>
                        </Paper>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        stacks: state.stack.stacks,
        searched: state.stack.searched
    }
}



export default connect(mapStateToProps, {searchStacks, populateAutoComplete, unmountSearch})(Search);