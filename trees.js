hideFamilyTree = () => {
    $('#diagram-container').hide();
    $('.card').removeClass('blur');
    $('.background-grid').removeClass('blur');
}

buildFamily = (protagonist) => {
$('#diagram-container').show();
$('.card').addClass('blur');
$('.background-grid').addClass('blur');

    let family = new Object;
    family.protagonist = protagonist.name;
    family.children = new Array;
    family.siblings = new Array;
    family.parent = protagonist.manager;

    people.forEach(function(comparator){
        if (comparator.manager === this.name){
        family.children.push(comparator.name)
    }
        if (comparator.manager === this.manager && comparator.name != this.name){
            family.siblings.push(comparator.name)
    }}, protagonist
    )

//JointJS experiment below
let num = 0
function alternator(num,spacer,mod) {
    if(num % 2 === 1){
        return (num)*spacer+spacer*mod
    } else {return (num-1)*(-1)*spacer-spacer*mod}
}

var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: document.getElementById('diagram'),
    model: graph,
    width: 750,
    height: 350,
    gridSize: 10,
    drawGrid: true,
    background: {
    }
});
//add protagonist
var rect = new joint.shapes.standard.Rectangle();
rect.position(300, 130);
rect.resize(115, 45);
rect.attr({
    body: {
        fill: 'red'
    },

    label: {
        text: joint.util.breakText(family.protagonist, { width: 85 }, {hyphen:true}),
        fill: 'white',
    }
});
rect.addTo(graph);

//add parent
if(family.parent){
var parent = rect.clone();
parent.translate(0, -100);
parent.attr({
    label: {
        text:joint.util.breakText(family.parent, { width: 85 })
    },
    body: {
        fill: 'blue'
    }
});
parent.addTo(graph);
}

//add siblings
if(family.siblings){
    num=1;
    for(let i = 0; i<family.siblings.length; i ++){
        let siblingrect = rect.clone();
        siblingrect.translate(alternator(num,70,1),0);
        siblingrect.attr({
            label: {
                text: joint.util.breakText(family.siblings[i], { width: 85 }, {hyphen:true}),
                fill: 'blue'
            },
            body: {
                fill: 'white'
            }
        });
        siblingrect.addTo(graph);

        var link = new joint.shapes.standard.Link();
        link.source(parent);
        link.target(siblingrect);
        link.addTo(graph);
        num++;
    };
}


//add children one by one
num=1;
for(let i = 0; i<family.children.length; i ++){
    let childrect = rect.clone();
    childrect.translate(alternator(num,70,0),130);
    childrect.attr({
        label: {
            text: joint.util.breakText(family.children[i], { width: 85 }, {hyphen:true}),
            fill: 'blue'
        },
        body: {
            fill: 'white'
        }
    });
    childrect.addTo(graph);

    var link = new joint.shapes.standard.Link();
    link.source(rect);
    link.target(childrect);
    link.addTo(graph);
    num++;
};
var link = new joint.shapes.standard.Link();
link.source(parent);
link.target(rect);
link.addTo(graph);



}
