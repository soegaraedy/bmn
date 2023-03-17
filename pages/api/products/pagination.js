import Bmn from "@/model/BmnSchema";


const options = {
    page:1,
    limit:10,
    customLabels: myCustomLabels,
};

Bmn.paginate({}, options, function(err, result){

});
