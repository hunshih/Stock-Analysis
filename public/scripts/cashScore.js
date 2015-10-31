var all_cash_graphs = [];
var selected_graph;

$(document).ready(function(){
    all_cash_graphs = ["#AssetTurnoverChart", "#lineChart", "#FreeCashFlow"]
    selected_graph = "#lineChart";
});

/**
* Called when user select the graph. Update the state of selected graph
* then fall function to scale and shrink graphs
* @ param: the id of the div that is clicked
*/
function enlarge(id){
    var clicked_graph = "#" + id;
    //Different graph is selected
    if(clicked_graph.localeCompare(selected_graph))
    {
        selected_graph = clicked_graph;
        scale_and_shrink();
    }
};

//Scale and shrink the graph being clicked
function scale_and_shrink(){
    for(var graph in all_cash_graphs){
        //any non-selected graph, shrink
        if(all_cash_graphs[graph].localeCompare(selected_graph)) {
            $( all_cash_graphs[graph] ).width( 100 );
        }
        else{
            $( all_cash_graphs[graph] ).width( 400 );
        }
    }
}
