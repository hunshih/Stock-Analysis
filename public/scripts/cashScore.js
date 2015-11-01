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
            resizeGraph(all_cash_graphs[graph], 70, 35);
            $( all_cash_graphs[graph] ).width( 70 );
            
        }
        else{
            resizeGraph(all_cash_graphs[graph], 800, 300);
            $( all_cash_graphs[graph] ).width( 800 );
        }
    }
};

//Function that draws the graph
function resizeGraph(target, wid, hight){
    if(target.localeCompare("#AssetTurnoverChart") == 0){
        resizeAT(wid, hight); 
    }
    else if(target.localeCompare("#lineChart") == 0){
        resizeDE(wid, hight);
    }
    else{
        resizeFC(wid, hight);
    }
}