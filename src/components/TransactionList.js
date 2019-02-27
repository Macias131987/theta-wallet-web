import React from "react";
import './TransactionList.css';
import TransactionListItem from './TransactionListItem'

class TransactionList extends React.Component {
    createList(){
        return this.props.transactions.map(function(transaction, index){
            return <TransactionListItem key={ transaction.hash }
                                        transaction={transaction}
            />;
        })
    };

    render() {
        return (
            <div className="TransactionList">
                {this.createList()}
            </div>
        );
    }
}

export default TransactionList;
