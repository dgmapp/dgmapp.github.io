/*
DONKEY GAME MAKER 3.1

By Most Boring Games & giorkesk
*/
//The surface
//imports
import * as THREE from './threejs/build/three.module.js';
import {PLYLoader} from './threejs/examples/jsm/loaders/PLYLoader.js';
import {FontLoader as BruhFontLoader} from './threejs/examples/jsm/loaders/FontLoader.js';
import {MapControls} from './threejs/examples/jsm/controls/OrbitControls.js';
import {TransformControls} from './threejs/examples/jsm/controls/TransformControls.js';

//To change

var SIP="localhost";

//constants
var renderer,
	camera,
	scene,
	mapcontrols,
	panel,
	subpanel,
	stats,
	hemi,
	ray,
	tcontrols,
	plyLoader,
	dialog,
	env,
	logicHtml,
	subwindow,
	stopbtn,
	gcamera,
	econtrols,
	bdivp,
	bsnc,
	projectLoader,
	smgr,
	ground,
	title,
	tutor;

//variables
var rad=(Math.PI/180);
var deg=(180/Math.PI);

var shadowbinds=[];
var mapsize=400;

var ext={};

var sc=[];
var vsc=[];
var scm=[];

var pointer=new THREE.Vector2();

var selection=-1;
var previousSelection=-1;

var spUpdateDelay=0;
var shown_message="";var time_remain_message=0;

var materialOnTheTable,defaultMaterial;

var otherobjects;

var virtual=false;
var running=false;

var keyspressed=[false,false,false,false];
var keysdn=[];

var econtrolobject=new THREE.Object3D();
var econtrack;
var edragged=false;

var accache=new THREE.Vector3(0,0,0);

var works={};
var workc={};
var blked={};

var globalslot;

var cgid="";

var wsraw_unread=[];
var wsdelay=50;

var tutor_disp=[""];
var tutor_disp_ind=0;

//Data
var assets_tl=[
	"player",
	"dog",
	"bear",
	"plane",
	"cube",
	"sphere",
	"ellipse",
	"cylinder",
	"cone",
	"torus"
];

var assets_names=[
	"Player",
	"Dog",
	"Bear",
	"Plane",
	"Cube",
	"Sphere",
	"Ellipse",
	"Cylinder",
	"Cone",
	"Torus"
];

var compNames=[
	"Move with keys",
	"Move according to cursor",
	"Follow object",
	"Wander around",
	"Avoid object",
	"Get followed by the camera",
	"Transfer data (position, values etc.)",
	"Program with blocks (Blockly) <img src='assets/must_try.png'>"
];

var compSids=[
	"movekeys",
	"movecursor",
	"follow",
	"wander",
	"avoid",
	"camerafollow",
	"transfer",
	"blockly"
];

var startMessage="Welcome to Donkey Game Maker!";

var about=`
	<h1>Donkey Game Maker 3.1</h1>
	<h2>Created by MostBoringGames, giorkesk.</h2>
	<p>DISCLAIMER: This is a non-commercial project.</p>
	</br>
	<p><b>Libraries used:</b></p>
	<p><a href="https://threejs.org">Three.js</a></p>
	<p><a href="https://developers.google.com/blockly">Blockly</a></p>
	</br>
	<p>Skybox by Jockum Skoglund - <a href="https://www.zfight.com">www.zfight.com</a></p>
`;

var tuts={
	"t1":["1.Create and move objects","t1"],
	"t2":["2.Rotate and scale","t2"],
	"t3":["3.Materials, rename and more","t3"],
	"t4":["4.Move with keys or cursor","t4"],
	"t5":["5.NPC Objects (Follow, Wander...)","t5"],
	"t6":["6.Camera follow","t6"],
	"t7":["7.Advanced programming","t7"],
	"t8":["8.Sub-objects","t8"],
	"t9":["9.Open and Save","t9"],
	"t10":["10.Before you create anything...","t10"]
};

var tutorials_data={
	"t1":[
		`
		Welcome to Donkey Game Maker!<br>
		To create a game, you need to have some objects. You can keep the cube for using it on these tutorials, or create another object, and then delete the cube.<br>
		When you create objects, click something from the right menu.
		`,
		`
		<img style="background:black;height:100px;width:200px;" src="assets/tuts/objmenu.png"/>
		`,
		`
		Change your selection from the left menu. It shows the objects and their names.<br>
		<img style="background:black;height:100px;width:200px;" src="assets/tuts/leftmenu.png"/>
		`,
		`
		Use these arrows to move your objects.<br>
		<img style="background:black;height:100px;width:200px;" src="assets/tuts/arrows.png"/>
		`,
		`
		The rectangles will also help you, if you want to move it on two axis.<br>
		The center of the selector will move the object according to your view.
		`,
		`
		You completed the tutorial!<br>
		In the next one, you will learn how to rotate and scale oblects.
		`
	],
	"t2":[
		`
		Scaling and rotation can be made with the same way as just moving.
		`,
		`
		<img style="background:black;height:100px;width:200px;" src="assets/tuts/leftmenu.png"/><br>
		The left menu has 3 icons at the top. The first changes to moving, the second to scaling and the third to rotation.
		`,
		`
		You completed the tutorial!<br>
		In the next one, you will learn how to apply color and material to your objects, and much more.
		`
	],
	"t3":[
		`
		How a computer understands a material?<br>
		How to apply it in an object here?<br>
		How to organize your objects?<br>
		All of these are going to get answered.<br>
		You will learn about materials, renaming, cloning and deleting objects.
		`,
		`Here, a material is a color, with a value of metalness. If the metalness is 0, your object is not metallic. Then, at 20, it becomes plastic, then metal, and then completely reflective.<br>
		Tip: The metalness must never be at a really high level, because it makes it feel like a mirror-like material.
		`,
		`
		In the right menu, you will find the <img class="picm" src="assets/mat.png"/> icon (material icon). Select the object you want, and click this to open a dialog. You can edit the color, and metalness. Then, click 'Save and quit' to finalise the operation.
		`,
		`
		Next to the material icon, there are some icons we will use in this tutorial.<br>
		The <img class="picm" src="assets/del.png"/> icon is used to delete the selected object.<br>
		The <img class="picm" src="assets/rename.png"/> icon is used to rename the selected object.<br>
		The <img class="picm" src="assets/clone.png"/> icon is used to clone the selected object.<br>
		`,
		`
		You completed the tutorial!<br>
		In the next one, you will learn how to add <b>INTERACTIVITY</b> to your projects for the first time!
		`
	],
	"t4":[
		`
		In Donkey Game Maker, there are multiple ways of adding interactivity to a game.<br>
		Here, your will learn the simplest. But later, you can learn the more advanced methods,<br>
		which can make your game more customized.
		`,
		`
		This simple way of programming is done by adding components to an object.<br>
		A component adds some functionality, like moving with the keyboard, or following another object.<br>
		You can add components from the left menu, while having the object you want selected.
		`,
		`
		Click the <button>Add component</button>&nbspbutton to open the list. Select a component, and click <button>OK</button>.<br>
		`,
		`
		The first component we will learn about is the "Movement with keys" component.<br>
		When added to an object, you can use the WASD (or arrows) keys to move it.
		`,
		`
		But that's not all. Click the <img class="picw" src="assets/run.png"/> icon on the right menu
		to run the game. Stop it by clicking the red square in the up-left corner.
		`,
		`
		Most of the components have properties under them. You can edit the values to customise the component.<br>
		For example, this component has a 'speed factor' property. If you change it to 2, it will double the movement speed.
		`,
		`
		You completed the tutorial!<br>
		In the next one, you will learn how to make an object follow another, or avoid it.
		You will also learn how to make an object wander around slowly, to make your game more "alive".
		`
	],
	"t5":[
		`
		Do you want to create objects that follow or avoid others?<br>
		Do you want them to just wander around?<br>
		You will learn how in this tutorial.
		`,
		`
		First, we will learn how to follow or avoid.<br>
		Add the Follow component exactly how you added the 'move with keys' component.<br>
		<img style="background:black;height:200px;" src="assets/tuts/components.png"/>
		`,
		`
		This component, has a 'object to follow' property and a 'speed factor' property.<br>
		In 'object to follow', insert <b>the name</b> of the object to be followed.<br>
		`,
		`
		In 'speed factor', insert 1 for normal speed, 2 for doubled speed,3 for tripled speed, or 0.5 for half the normal speed. 0 means no speed. You can enter whatever number you like.
		`,
		`
		Now that you've learned how to setup this component, create another object, rename it, and write its name in the component. The component must be on a different object.<br>
		The, click 'Run' to test it.<br>
		If it won't work:
		Check if the first object with the component has the name correctly.
		`,
		`
		But we are not over yet. Try the avoid component, which will avoid the object in the 'object to avoid' property.<br>
		This component will make the object run away from another.<br>
		Basically, it is the opposite of the follow component.
		`,
		`
		The last part in this tutorial will be the 'Wander' component.
		When you add it, the object stays still, then randomly decides to move a bit, and again still. And again moving.
		`,
		`
		The 'speed factor' works exactly like the others.<br>
		The 'stand time factor' works like the speed factor, but if you change it from 2 to 3, it stands for a longer period of time.
		The 'move time factor' is exactly like the previous, but it affects the periods of time the object moves.
		`,
		`
		You completed the tutorial!<br>
		In the next one, you will learn about how to make the camera follow the object.
		`
	],
	"t6":[
		`
		Ever wondered how to make the camera follow the object, and look at it from the sky, or first person?
		This is what you are going to learn here.
		`,
		`
		First, add the 'Follow camera' component.<br>
		This will make the camera follow the object, even if it moves.
		`,
		`
		The 'Distance' property controls the distance between the camera and the object.<br>
		The 'First Person Mode' property will enable first person camera, according to the rotation of the object. But it will also hide the object.
		`,
		`
		You completed the tutorial!<br>
		In the next tutorial, you will learn how to program your game with blocks.<br>
		This new programming method can add a lot of features in your game.
		`
	],
	"t7":[
		`
		Have you ever used blocks to create programs? Here, you will learn how to do it in Donkey Game Maker.
		`,
		`
		First, create the 'Program with blocks' component.<br>
		To organise the game, you can add multiple of these components per object.
		This component has no properties, but an 'Edit blocks' button. Click it to open the block editor.<br>
		`,
		`
		Click the categories, and drag blocks to create programs.<br>
		Here, there are no events. Just add some floating blocks, and connect them if you want.<br>
		The floating blocks will run repeatedly.
		The blocks in 'On game started' event will run only one time.
		`,
		`
		The blocks in 'On key pressed' event will run repatedly, while you press a key.
		`,
		`
		Besides all the classic categories, you can use the "Movement" category to move the object and rotate it,<br>
		or the "Transformations" category to make pure transformations.
		`,
		`
		In the category 'Variables' there are global and local variables.<br>
		The local variables need initialization, while the globals don't<br>
		`,
		`
		Warning 1:Type the name of the variables exactly, without mistakes to successfully access it.<br>
		Warning 2:Contain ONLY english characters, no numbers, and no spaces or symbols. Try simple names, such as 'loc' or 'rot'.<br>
		`,
		`
		You completed the tutorial!<br>
		In the next tutorial, you will learn how to create your own models, using sub-objects.<br>
		`
	],
	"t8":[
		`
		Ever wondered how to create your own object, like a house?<br>
		Here, you will learn how to add 'sub-objects' to modify an object the correct way.
		`,
		`
		Why Sub-objects?<br>
		If you add 'eyes' to a cube, then move it, the eyes will not move.<br>
		To fix this, delete the previous eyes, and add them as sub-objects.
		`,
		`
		Sub-objects are mini-objects attached to the main one. They can't have logic, blocks or names.<br>
		There are some small buttons,
		<img class="picm" src="assets/subadd.png"/>
		<img class="picm" src="assets/subdel.png"/>
		<img class="picm" src="assets/submat.png"/>
		.
		The first will add a sub-object on the selected object.
		The second will delete the selected sub-object.
		The third will edit the material of the sub-object.
		`,
		`
		To move, rotate or scale a subobject, select its parent, and in the list, you will see these:<br>
		<img style="background:black;height:200px;" src="assets/tuts/subobjects.png"/><br>
		Click on any, and change the transform mode with the same buttons as before.
		`,
		`
		Now, try making a door, by resizing the main object and adding a cylinder, and sphere as the handle.<br>
		Move, rotate and scale the sphere and cylinder to create it.<br>
		If you move this door, the handle will stay attached.
		`,
		`
		You completed the tutorial!<br>
		In the next tutorial, you will learn how to save and open your games from your local storage.
		`
	],
	"t9":[
		`
		If you want to share your game with others, or save it to continue it later, you will need to use these buttons:<br>
		<img class="picm" src="assets/read.png"/>
		<img class="picm" src="assets/write.png"/>
		`,
		`
		The first one will open a dialog, where you can upload your .DGM file.<br>
		The second will download the project, in its current state.
		`,
		`
		You completed the tutorial!<br>
		Now, before you start creating games, look at the last tutorial.
		`
	],
	"t10":[
		`
		Donkey Game Maker 3.1 is in Beta state (unstable).
		Try to save your games frequently, so in case of a bug, you can restore a bit older&nbsp
		version of the game.<br>
		The creator is not responsible for any game corruption, or any illegal use of this software.<br>
		And with that out of the way, click next!
		`,
		`
		<h1>You have <b style="color:rgb(0,100,0);">completed</b> all of the tutorials!</h1>
		Now, create whatever you want with everything you learned from here!
		`
	]
};

//Init and animate
function init(){
	//renderer!
	renderer=new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(dwh()[0],dwh()[1]);
	document.getElementById("content").appendChild(renderer.domElement);
	//camera!
	camera=new THREE.PerspectiveCamera(30,dwh()[0]/dwh()[1],1,10000);
	camera.position.set(0,0,0);
	camera.up.set(0,1,0);
	camera.rotation.set(rad*45,0,0);
	gcamera=new THREE.PerspectiveCamera(30,dwh()[0]/dwh()[1],1,10000);
	gcamera.position.set(0,0,0);
	gcamera.up.set(0,1,0);
	gcamera.rotation.set(0,0,0);
	//scene!
	scene = new THREE.Scene();
	//camera add!
	scene.add(camera);
	//envmap!
	env=new THREE.CubeTextureLoader()
		.setPath('assets/sky/')
		.load(['px.png','nx.png','py.png','ny.png','pz.png','nz.png']);
	scene.background=env;
	//default material!
	defaultMaterial=new THREE.MeshPhongMaterial({color:0xFFFFFF,side:THREE.DoubleSide,envMap:env,reflectivity:0,flatShading:false});
	//controls!
	//	mapcontrols
	mapcontrols=new MapControls(camera,renderer.domElement);
	mapcontrols.minPolarAngle=0;
	mapcontrols.maxPolarAngle=rad*90;
	mapcontrols.minDistance=10;
	mapcontrols.maxDistance=2000;
	mapcontrols.enableDamping=true;
	mapcontrols.dampingFactor=0.05;
	//	events
	document.addEventListener("mousemove",onPointerMove);
	document.addEventListener("mousedown",onClick);
	document.addEventListener("keydown",onKeyDown);
	document.addEventListener("keyup",onKeyUp);
	window.addEventListener("resize",onWindowResize);
	//	ray
	ray=new THREE.Raycaster();
	//	transformcontrols
	tcontrols=new TransformControls(camera,renderer.domElement);
	scene.add(tcontrols);
	econtrols=new TransformControls(camera,renderer.domElement);
	scene.add(econtrols);
	scene.add(econtrolobject);
	//light!
	hemi=new THREE.HemisphereLight(0xffffff,0x333333,1);
	hemi.position.set(0,20,0);
	scene.add(hemi);
	//ground!
	ground=new THREE.GridHelper(mapsize,(mapsize/2)-1);
	scene.add(ground);
	//server manager! (now unused)
	smgr=new ServerManager(SIP);
	//panel!
	createPanel();
	//load!
	plyLoader=new PLYLoader();
	projectLoader=new DGMLoader();
	loadReq(0);
	//animation!
	animate();
	//end. 
}

function animate(){
	requestAnimationFrame(animate);
	updateTitle();
	if(!running){
		if(tcontrols.dragging||econtrols.dragging){
			mapcontrols.enabled=false;
		}else{
			mapcontrols.enabled=true;
			mapcontrols.update();
		}
	}else{
		wsdelay--;
		if(wsdelay==0){
			wsdelay=50;
			updateWS();
		}
	}
	updateMsg();
	selectionChkFrame();
	if(running){
		runtick();
	}
	if(running){
		renderer.render(scene,gcamera);
	}else{
		renderer.render(scene,camera);
	}
}

//The underworld

function updateTitle(){
	let margin=Number(title.style.marginLeft.split("px")[0]);
	margin+=2;
	if(margin>201){
		margin=-200;
	}
	title.style.marginLeft=String(margin)+"px";
}

function runtick(){
	for(var i=0;i<scm.length;i++){
		var logic=scm[i]["logic"];
		for(var comp=0;comp<logic.length;comp++){
			logic[comp].execute(i);
		}
	}
}

function run(){
	if(!running){
		compileAll();
		virtualize();
		running=true;
		ground.visible=false;
		fixBlocklies();
		subwindow.style.display="none";
		panel.style.display="none";
		stopbtn.style.display="block";
		mapcontrols.enabled=false;
		gcamera.position.x=camera.position.x;
		gcamera.position.y=camera.position.y;
		gcamera.position.z=camera.position.z;
		gcamera.rotation.x=camera.rotation.x;
		gcamera.rotation.y=camera.rotation.y;
		gcamera.rotation.z=camera.rotation.z;
		if(cgid!=""){
			connectToServer();
		}
	}
}

function stop(){
	unvirtualize();
	running=false;
	ground.visible=true;
	subwindow.style.display="block";
	panel.style.display="block";
	stopbtn.style.display="none";
	mapcontrols.enabled=true;
	if(cgid!=""){
		disconnectFromServer();
	}
}

function virtualize(){
	if(!virtual){
		virtual=true;
		tcontrols.detach();
		vsc=[];
		for(var i=0;i<sc.length;i++){
			sc[i].removeFromParent();
			vsc.push(sc[i].clone());
			scene.add(vsc[i]);
		}
	}
}

function unvirtualize(){
	if(virtual){
		virtual=false;
		for(var i=0;i<vsc.length;i++){
			vsc[i].removeFromParent();
		}
		vsc=[];
		for(var i=0;i<sc.length;i++){
			scene.add(sc[i]);
		}
		tcontrols.attach(sc[selection]);
	}
}

function fixBlocklies(){
	for(var i=0;i<scm.length;i++){
		var logic=scm[i]["logic"];
		for(var comp=0;comp<logic.length;comp++){
			if(logic[comp].saveid=="blockly"){
				logic[comp].firstRun=true;
			}
		}
	}
}

function onKeyUp(event){
	if(event.code=="ArrowUp"||event.code=="KeyW"){
		keyspressed[0]=false;
	}
	if(event.code=="ArrowLeft"||event.code=="KeyA"){
		keyspressed[1]=false;
	}
	if(event.code=="ArrowDown"||event.code=="KeyS"){
		keyspressed[2]=false;
	}
	if(event.code=="ArrowRight"||event.code=="KeyD"){
		keyspressed[3]=false;
	}
	keysdn[event.code]=false;
}

function onKeyDown(event){
	if(event.code=="ArrowUp"||event.code=="KeyW"){
		keyspressed[0]=true;
		
	}
	if(event.code=="ArrowLeft"||event.code=="KeyA"){
		keyspressed[1]=true;
	}
	if(event.code=="ArrowDown"||event.code=="KeyS"){
		keyspressed[2]=true;
	}
	if(event.code=="ArrowRight"||event.code=="KeyD"){
		keyspressed[3]=true;
	}
	keysdn[event.code]=true;
}

function updateLogicHtml(){
	var rids=[];
	var clogic=scm[selection]["logic"];
	var final="<p><button style='margin-top:18px;' id='logic_add'>Add new component</button></p>";
	if(clogic!=undefined&&clogic.length>0){
		for(var i=0;i<clogic.length;i++){
			final+="<p style='color:dark-gray;text-size:20px;'>"+clogic[i].label;
			final+="<button id='logic-delete-"+String(i)+"' style='background:red;color:white;'>X</button></p>";
			final+="<p style='color:gray;font-size:12px;margin:4px;'>"+clogic[i].description+"</p>";
			var pdct=clogic[i].properties;
			for(var ii in pdct){
				var rid=String(i)+"|"+String(ii);
				rids.push(rid);
				final+="<p style='color:dark-gray;font-size:13px;'>"+
					ii+":&nbsp<input type='text' id='logic_prop_"+rid+"' value='"+String(pdct[ii])+"'></p>";
			}
			if(clogic[i].label=="Block program"){
				final+="<button id='blked"+String(i)+"'>Edit blocks</button>";
			}
		}
	}else{
		final+="<i style='color:gray;'>No components or logic enabled.</i>";
	}
	logicHtml.innerHTML=final;
	for(var i=0;i<rids.length;i++){
		var elem=document.getElementById("logic_prop_"+rids[i]);
		elem.addEventListener("change",function(event){
			var newval=this.value;
			var compid=Number(this.id.split("_")[2].split("|")[0]);
			var propname=String(this.id.split("_")[2].split("|")[1]);
			scm[selection]["logic"][compid].properties[propname]=String(newval);
		});
	}
	blked=[];
	for(var i=0;i<clogic.length;i++){
		if(clogic[i].label=="Block program"){
			var elem=document.getElementById("blked"+String(i));
			elem.addEventListener("click",function(){
				var numid=Number(this.id.split("blked")[1]);
				loadOpen(numid);
			});
			blked[String(i)]=clogic[i].codeslot;
		}
	}
	for(var i=0;i<clogic.length;i++){
		var xbtn=document.getElementById("logic-delete-"+String(i));
		xbtn.addEventListener("click",function(){
			var tdl=Number(this.id.split("logic-delete-")[1]);
			var confirmed=window.confirm("This component will be deleted! Are you sure?");
			if(confirmed){
				scm[selection]["logic"].splice(tdl,1);
				updateLogicHtml();
			}
		});
	}
	document.getElementById("logic_add").addEventListener("click",addLogicComponent);
}

function addLogicComponent(){
	var logicSelectorCode=`
		<p>Selected:</p><p id="logicadd_selection">none</p>
		<style>
			.la_labels{
				margin:18px;
				margin-left:24px;
			}
		</style>
		<p><button id="logicadd_ok" class="ok">OK</button><button id="logicadd_cancel" class="cancel">Cancel</button></p>
	`;
	var logicSelectorPart=`
		<p onclick="document.getElementById('logicadd_selection').innerHTML='{sid}';">
			<span class="la_labels">{label}</span>
		</p>
	`;
	for(var i=0;i<compNames.length;i++){
		var lspf="";
		lspf+=logicSelectorPart.split("{sid}")[0];
		lspf+=compSids[i];
		lspf+=logicSelectorPart.split("{sid}")[1].split("{label}")[0];
		lspf+=compNames[i];
		lspf+=logicSelectorPart.split("{label}")[1];
		logicSelectorCode+=lspf;
	}
	editDialog(logicSelectorCode);
	showDialog();
	var okbtn=document.getElementById("logicadd_ok");
	okbtn.addEventListener("click",finishAddLogicComponent);
	var cancelbtn=document.getElementById("logicadd_cancel");
	cancelbtn.addEventListener("click",cancelAddLogicComponent);
}

function finishAddLogicComponent(){
	var sid=String(document.getElementById("logicadd_selection").innerHTML);
	if(sid!="none"){
		hideDialog();
		var sidd=compSids.indexOf(sid);
		var f;
		if(sidd==0){
			f=new KeyMovementComponent();
		}
		if(sidd==1){
			f=new CursorMovementComponent();
		}
		if(sidd==2){
			f=new FollowComponent();
		}
		if(sidd==3){
			f=new WanderComponent();
		}
		if(sidd==4){
			f=new AvoidComponent();
		}
		if(sidd==5){
			f=new CameraTargetComponent();
		}
		if(sidd==6){
			f=new DataTransferComponent();
		}
		if(sidd==7){
			var rid=String(random(100000,999999));
			works[rid]="";
			f=new BlocklyComponent(rid);
		}
		if(sidd==8){
			f=new ClientComponent();
		}
		if(sidd==9){
			f=new ShareComponent();
		}
		scm[selection]["logic"].push(f);
	}else{
		showMessage("Select a component first.");
	}
	updateLogicHtml();
}

function cancelAddLogicComponent(){
	hideDialog();
}

function showMessage(msg){
	shown_message=msg;
	time_remain_message=150;
}

function updateMsg(){
	if(time_remain_message>0){
		time_remain_message--;
		document.getElementById("message").innerHTML=shown_message;
		document.getElementById("message").style.opacity=((time_remain_message)/150)+((time_remain_message)/300);
	}else{
		document.getElementById("message").innerHTML="";
	}
}

function loadReq(ind){
	plyLoader.load("assets/"+assets_tl[ind]+".ply",function(geo){
		geo.computeVertexNormals();
		var dmat=defaultMaterial.clone();
		ext[assets_tl[ind]]=new THREE.Mesh(geo,dmat);
		ext[assets_tl[ind]].rotation.set(rad*270,0,0);
		if(ind==assets_tl.length-1){
			onReqLoaded();
		}else{
			loadReq(ind+1);
		}
	});
}

function onReqLoaded(){
	hideDialog();
	showMessage(startMessage);
	var msh=ext["cube"].clone();
	msh.material=msh.material.clone();
	addMesh(msh,"Box","cube");
	renewSelection();
	updateSubpanel();
	Blockly.inject("bdiv",{
		toolbox:document.getElementById("toolbox"),
		scrollbars:true
	});
	closeBlocks();
}

function showDialog(){
	dialog.style.display="block";
}

function hideDialog(){
	dialog.style.display="none";
}

function editDialog(html){
	dialog.innerHTML=html;
}

function random(min, max) {
	return(Math.floor(Math.random()*(max-min+1)+min));
}

function selectionChanged(sel){
	tcontrols.detach();
	tcontrols.attach(sc[sel]);
	updateLogicHtml();
	updateSubpanel();
}

function selectionChkFrame(){
	if(previousSelection!=selection){
		previousSelection=selection;
		if(selection>=0&&selection!=undefined){
			selectionChanged(selection);
		}
	}
}

function subpanelItemClick(ind){
	selection=ind;
}

function subPanelSubObjectClick(idd){
	var oid=selection;
	var soid=Number(idd.split("_")[2]);
	try{
		econtrols.detach();
	}catch(err){}
	econtrols.attach(sc[oid].children[soid]);
}

function updateSubpanel(){
	if(selection!=undefined&&selection!=-1){
		//put dom elements
		var final=`
		<style>
			.subobjects{
				color:gray;
				font-size:15px;
			}
		</style>
		`;
		for(var i=0;i<sc.length;i++){
			final+="<p id='subpanelItemNo"+String(i)+"'>"+String(scm[i]["name"])+"</p>";
			if(selection==i){
				var subobjects=sc[selection].children;
				for(var ii=0;ii<subobjects.length;ii++){
					var soid=String(i)+"_"+String(ii);
					var soname="suboject"+String(ii+1);
					final+=`
					<p id="subpanelSubObject_${soid}" class="subobjects">
					&nbsp
					&nbsp
					&nbsp
					${soname}
					</p>
					`;
				}
			}
		}
		subpanel.innerHTML=final;
		//put events
		for(var i=0;i<scm.length;i++){
			document.getElementById("subpanelItemNo"+String(i)).addEventListener("click",
				function(){
					subpanelItemClick(Number(String(this.id).split("subpanelItemNo")[1]));
				}
			);
			if(selection==i){
				var subobjects=sc[selection].children;
				for(var ii=0;ii<subobjects.length;ii++){
					try{
						document.getElementById("subpanelSubObject_"+String(i)+"_"+String(ii))
							.addEventListener("click",
								function(){
									subPanelSubObjectClick(this.id);
								}
							);
					}catch(err){}
				}
			}
		}
	}
}

function addMesh(ob,name,base){
	sc.push(ob);
	scm.push({
		"name":name,
		"logic":[],
		"base":base,
		"subbases":[]
	});
	scene.add(ob);
	updateSubpanel();
}

function deleteMesh(ind){
	sc[ind].removeFromParent();
	sc.splice(ind,1);
	scm.splice(ind,1);
	updateSubpanel();
	updateLogicHtml();
}

function deleteMeshQuiet(){
	tcontrols.detach();
	sc[0].removeFromParent();
	sc=[];scm=[];
	tcontrols.attach(sc[0]);
}

function deleteSelectedObject(){
	var confirmed=window.confirm("This object will be deleted! Are you sure?");
		if(confirmed){
		try{
			if(sc.length>1){
				tcontrols.detach();
				deleteMesh(selection);
				selection=0;
				tcontrols.attach(sc[selection]);
			}else{
				showMessage("You can't delete an object if it's the only one in the scene. Create another object in order to delete this.");
			}
		}catch(err){}
	}
}

function fastGeoToMesh(geo){
	var mat=defaultMaterial.clone();
	return(new THREE.Mesh(geo,mat));
}

function renewSelection(){
	selection=sc.length-1;
}

function addObject(oid){
	if(oid==0){
		var msh=ext["player"].clone();
		msh.material=msh.material.clone();
		addMesh(msh,"Player","player");renewSelection();
	} 
	if(oid==1){
		var msh=ext["cube"].clone();
		msh.material=msh.material.clone();
		addMesh(msh,"Box","cube");renewSelection();
	}
	if(oid==2){
		var msh=ext["sphere"].clone();
		msh.material=msh.material.clone();
		addMesh(msh,"Sphere","sphere");renewSelection();
	}
	if(oid==3){
		var msh=ext["plane"].clone();
		msh.material=msh.material.clone();
		addMesh(msh,"Plane","plane");renewSelection();
	}
}

function changeTMode(mid){
	if(mid==0){
		tcontrols.mode="translate";
		econtrols.mode="translate";
	}
	if(mid==1){
		tcontrols.mode="scale";
		econtrols.mode="scale";
	}
	if(mid==2){
		tcontrols.mode="rotate";
		econtrols.mode="rotate";
	}
}

function setTransformButtonsEvents(){
	document.getElementById("mc1").addEventListener("click",function(){changeTMode(0);});
	document.getElementById("mc2").addEventListener("click",function(){changeTMode(1);});
	document.getElementById("mc3").addEventListener("click",function(){changeTMode(2);});
}

function openMaterialDialog(mat){
	var ihtml=`
		<p style="font-size:30px;color:white;">Material editor
			<button id="me_qcsave" style="margin-left:8px;" class="ok">Save and close</button>
			<button id="me_cancel" style="margin-left:8px;" class="cancel">Cancel</button></p>
		<p>Color:<input type="color" id="me_color"></p>
		<p>Metalness:<input type="range" min="0" max="100" id="me_metalness" style="width:75%;"></p>
	`;
	editDialog(ihtml);
	document.getElementById("me_qcsave").addEventListener("click",closeMaterialDialog);
	document.getElementById("me_cancel").addEventListener("click",hideDialog);
	document.getElementById("me_color").value="#"+mat.color.getHexString();
	document.getElementById("me_metalness").value=mat.reflectivity*100;
	showDialog();
	materialOnTheTable=mat;
}

function closeMaterialDialog(){
	var data=[
		new THREE.Color(document.getElementById("me_color").value),
		Number(document.getElementById("me_metalness").value)
	];
	materialOnTheTable.color=data[0];
	materialOnTheTable.reflectivity=data[1]/100;
	hideDialog();
}

function finishOOSelection(){
	hideDialog();
	var ind_num=Number(this.id.split("oo_p")[1]);
	var msh=ext[assets_tl[ind_num]].clone();
	msh.material=msh.material.clone();
	addMesh(msh,assets_names[ind_num],assets_tl[ind_num]);
	renewSelection();
}

function getOOSelector(){
	var final=`<p style="font-size:30px;color:white;">More Objects<button id="oo_cancel" style="margin-left:8px;" class="cancel">Cancel</button></p><p>`;
	for(var i=0;i<assets_names.length;i++){
		final+=`
			<div style='display:inline-block;' id='oo_p`+String(i)+`'>
				<img src='assets/moreobjects/`+assets_tl[i]+`.png' class='moreobject'>
				<p>`+assets_names[i]+`</p>
			</div>
		`;
	}
	final+="</p>";
	return(final);
}

function quitEditMode(){
	econtrack=undefined;
}

function materialEditMode(){
	var sso=findSubObjectAndSearchEverywhere(econtrack);
	var mat=scm[sso[0]]["sub"][sso[1]].material;
	openMaterialDialog(mat);
}

function otherObjectsDialog(){
	editDialog(getOOSelector());
	for(var i=0;i<assets_names.length;i++){
		var oo_pv=document.getElementById("oo_p"+String(i));
		oo_pv.addEventListener("click",finishOOSelection);
	}
	var cbtn=document.getElementById("oo_cancel");
	cbtn.addEventListener("click",function(){
		hideDialog();
	});
	showDialog();
}

function editMaterial(){
	try{
		var mat=sc[selection].material;
		openMaterialDialog(mat);
	}catch(err){}
}

function editMaterialSub(){
	try{
		var mat=econtrols.object.material;
		openMaterialDialog(mat);
	}catch(err){}
}

function clone(){
	try{
		var newmesh=sc[selection].clone();
		newmesh.material=newmesh.material.clone();
		for(var i=0;i<newmesh.children.length;i++){
			newmesh.children[i].material=newmesh.children[i].material.clone();
		}
		addMesh(newmesh,scm[selection]["name"]+" clone",scm[selection]["base"]);renewSelection();
	}catch(err){}
}

function setNameSelection(){
	try{
		var finalName=window.prompt("Insert new name:",scm[selection]["name"]);
		if(finalName!=null){
			scm[selection]["name"]=finalName;
			updateSubpanel();
		}
	}catch(err){}
}

function delSub(){
	var confirmed=window.confirm("The selected subobject will be deleted! Are you sure?");
	if(confirmed){
		var sobj=econtrols.object;
		econtrols.detach();
		sobj.removeFromParent();
		sobj.visible=false;
		var sobj_index=sc[selection].children.indexOf(sobj);
		if(sobj_index>-1){
			scm[selection]["subbases"].splice(sobj_index,1);
		}
		updateSubpanel();
	}
}

function createPanel(){
	panel=document.getElementById("panel");
	subpanel=document.getElementById("subpanelc");
	dialog=document.getElementById("dialog");
	logicHtml=document.getElementById("logic");
	subwindow=document.getElementById("subpanel");
	stopbtn=document.getElementById("stopbtn");
	bdivp=document.getElementById("bdivp");
	bsnc=document.getElementById("bsnc");
	bsnc.addEventListener("click",saveQuit);
	stopbtn.addEventListener("click",stop);
	title=document.getElementById("title_inner");
	tutor=document.getElementById("tutor");
	setTransformButtonsEvents();
	var bt=[
		function(){
			addObject(0);
		},
		function(){
			addObject(1);
		},
		function(){
			addObject(2);
		},
		function(){
			addObject(3);
		},
		function(){
			otherObjectsDialog();
		},
		function(){
			deleteSelectedObject();
		},
		function(){
			clone();
		},
		function(){
			setNameSelection();
		},
		function(){
			editMaterial();
		},
		function(){
			addSub();
		},
		function(){
			delSub();
		},
		function(){
			editMaterialSub();
		},
		function(){
			run();
		},
		function(){
			editDialog("<input type='file' id='file-selector'></input>");
			var fsel=document.getElementById("file-selector");
			showDialog();
			fsel.addEventListener("change",function(event){
				hideDialog();
				var promise=event.target.files[0].arrayBuffer();
				promise.then(function(vall){
					projectLoader.loadFromText(String.fromCharCode.apply(null,new Uint8Array(vall)));
				});
			});
		},
		function(){
			download(projectLoader.writeToText(),"project.dgm");
		},
		function(){
			editDialog("<button id='closeAbout'>Close</button><br><div style='padding:50px;margin:50px;background:white;color:black;'>"+about+"</div>");
			showDialog();
			document.getElementById("closeAbout").addEventListener("click",function(){
				hideDialog();
			});
		},
		function(){
			openTutorials();
		}
	];
	var elems=[
		document.getElementById("qadd1"),
		document.getElementById("qadd2"),
		document.getElementById("qadd3"),
		document.getElementById("qadd4"),
		document.getElementById("qadd5"),
		document.getElementById("qdelete"),
		document.getElementById("qclone"),
		document.getElementById("qrename"),
		document.getElementById("qmaterial"),
		document.getElementById("qaddsub"),
		document.getElementById("qdelsub"),
		document.getElementById("qmatsub"),
		document.getElementById("qrun"),
		document.getElementById("qread"),
		document.getElementById("qwrite"),
		document.getElementById("qabout"),
		document.getElementById("bgetstarted")
	];
	for(var i=0;i<elems.length;i++){
		elems[i].addEventListener("click",bt[i]);
	}
	
}

function dwh(){
	return([window.innerWidth,window.innerHeight]);
}

function cast(){
	camera.updateMatrixWorld();
	ray.setFromCamera(pointer,camera);
	var out=ray.intersectObjects(scene.children,false);
	return(out);
}

function getSceneObject(point3d){
	var out=-1;
	var nd=4000;
	var point=[point3d.x,point3d.z+35];
	for(var i=0;i<sc.length;i++){
		var dst=dist(sc[i].position.x,sc[i].position.y,point[0],point[1]);
		if(dst<nd){
			nd=dst;
			out=i;
		}
	}
	return(out);
}

function dist(x1,y1,x2,y2){
	return(Math.abs(Math.sqrt(((x1-x2)*(x1-x2))+((y1-y2)*(y1-y2)))));
}

function vdist(v1,v2){
	return(Math.abs(Math.sqrt(((v1.x-v2.x)*(v1.x-v2.x))+((v1.z-v2.z)*(v1.z-v2.z)))));
}

function onPointerMove(ev){
	pointer.x=ev.clientX;
	pointer.y=ev.clientY;
}

function onWindowResize(){
	var pxs=dwh();
	camera.aspect=pxs[0]/pxs[1];
	camera.updateProjectionMatrix();
	gcamera.aspect=pxs[0]/pxs[1];
	gcamera.updateProjectionMatrix();
	renderer.setSize(pxs[0],pxs[1]);
}

function onClick(){
	//cast();//Worst thing in existence.
}

function checkCamBounds(){
	var mapsize=(cmapsize/2)-400;
	var bounds=[0-mapsize,0-mapsize,mapsize,mapsize];
	if(camera.position.x<bounds[0]){
		camera.position.x=bounds[0];
	}
	if(camera.position.y<bounds[1]){
		camera.position.y=bounds[1];
	}
	if(camera.position.x>bounds[2]){
		camera.position.x=bounds[2];
	}
	if(camera.position.y>bounds[3]){
		camera.position.y=bounds[3];
	}
}

function inRange(r1,r2,r){
	return(r>r1&&r<r2);
}

function rotate(x,y,a){
	var rad=0-a;
	var s=Math.sin(rad);
	var c=Math.cos(rad);
	var ox=(x*c)-(y*s);
	var oy=(x*s)+(y*c);
	return([ox,oy]);
}

function rotate3d(px,py,pz,pitch,roll,yaw){
	var cosa=Math.cos(yaw);
	var sina=Math.sin(yaw);
	var cosb=Math.cos(pitch);
	var sinb=Math.sin(pitch);
	var cosc=Math.cos(roll);
	var sinc=Math.sin(roll);
	var Axx=cosa*cosb;
	var Axy=cosa*sinb*sinc-sina*cosc;
	var Axz=cosa*sinb*cosc+sina*sinc;
	var Ayx=sina*cosb;
	var Ayy=sina*sinb*sinc+cosa*cosc;
	var Ayz=sina*sinb*cosc-cosa*sinc;
	var Azx=0-sinb;
	var Azy=cosb*sinc;
	var Azz=cosb*cosc;
	px=Axx*px+Axy*py+Axz*pz;
	py=Ayx*px+Ayy*py+Ayz*pz;
	pz=Azx*px+Azy*py+Azz*pz;
	return([px,py,pz]);
}

function findObjectFromName(name){
	var out=-1;
	for(var i=0;i<scm.length;i++){
		if(scm[i]["name"]==name){
			out=i;
		}
	}
	return(out);
}

function finishSub(add_id){
	var avaliable_subs=[
		"plane",
		"cube",
		"sphere",
		"ellipse",
		"cylinder",
		"cone",
		"torus"
	];
	var msh=ext[avaliable_subs[add_id]].clone();
	msh.material=msh.material.clone();
	var new_object=msh;
	new_object.position.set(0,0,4);
	sc[selection].add(new_object);
	scm[selection]["subbases"].push(avaliable_subs[add_id]);
	updateSubpanel();
}

function addSub(){
	var ssheader=`
		<h2>Subobjects are smaller objects connected to a normal one, mostly to add detil. 
		Use them to create your own models, or to modify a model or geometry.
		</h2>
	`;
	ssheader+=`
		<style>
			#subobject_add_cancel{
				display:inline-block;
				margin:8px;
			}
		</style>
		<button id="subobject_add_cancel" class="cancel">
		Cancel
		</button>
	`;
	var avaliable_subs=[
		"plane",
		"cube",
		"sphere",
		"ellipse",
		"cylinder",
		"cone",
		"torus"
	];
	for(var i=0;i<avaliable_subs.length;i++){
		ssheader+="<p id='subobject_add"+String(i)+"'>";
		ssheader+=avaliable_subs[i];
		ssheader+="</p>";
	}
	editDialog(ssheader);
	showDialog();
	for(var i=0;i<avaliable_subs.length;i++){
		var elem=document.getElementById("subobject_add"+String(i));
		elem.addEventListener("click",function(){
			var idn=Number(
				this.id.split("_add")[1]
			);
			hideDialog();
			finishSub(idn);
		});
	}
	var celem=document.getElementById("subobject_add_cancel");
	celem.addEventListener("click",function(){
		hideDialog();
	});
}

function openBlocks(){
	bdivp.style.display="block";
}

function closeBlocks(){
	bdivp.style.display="none";
}

function loadBlocks(txt){
	var xml;
	if((txt!="")&&(txt!=undefined)){
		xml=Blockly.Xml.textToDom(txt);
		Blockly.Xml.domToWorkspace(xml,Blockly.mainWorkspace);
	}else{
		clearBlocks();
	}
}

function saveBlocks(){
	var xml=Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	return(Blockly.Xml.domToText(xml));
}

function clearBlocks(){
	Blockly.mainWorkspace.clear();
}

function codifyBlocks(){
	var code;
	try{
		code=Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
	}catch(err){
		code="";
	}
	return(code);
}

function compileAll(){
	for(var wrk in works){
		clearBlocks();
		loadBlocks(works[wrk]);
		workc[wrk]=codifyBlocks();
	}
}

function loadOpen(numid){
	clearBlocks();
	var rid=blked[String(numid)];
	globalslot=rid;
	if(works[rid]!=""){
		loadBlocks(works[rid]);
	}
	openBlocks();
}

function saveQuit(){
	works[globalslot]=saveBlocks();
	closeBlocks();
}

function bapi_gobj(name){
	var out=undefined;
	for(var i=0;i<scm.length;i++){
		if(scm[i]["name"]==name){
			out=vsc[i];
		}
	}
	return(out);
}

function bapi_distance(name1,name2){
	var obj1=bapi_gobj(name1).position;
	var obj2=bapi_gobj(name2).position;
	var s1=(obj2.x-obj1.x)*(obj2.x-obj1.x);
	var s2=(obj2.z-obj1.z)*(obj2.z-obj1.z);
	console.log(Math.sqrt(s1+s2));
	return(Math.sqrt(s1+s2));
}

function bapi_forward(objid,steps){
	var obj=vsc[objid];
	var offg=0-(steps/100);
	var angleto=obj.rotation.z;
	//find sin and cos stuff
	var s=Math.sin(0-angleto);
	var c=Math.cos(0-angleto);
	//find final offsets
	var offx=0-(offg*s);
	var offy=offg*c;
	obj.position.x-=offx;
	obj.position.z-=offy;
}

function bapi_backwards(objid,steps){
	var obj=vsc[objid];
	var offg=steps/100;
	var angleto=obj.rotation.z;
	//find sin and cos stuff
	var s=Math.sin(0-angleto);
	var c=Math.cos(0-angleto);
	//find final offsets
	var offx=0-(offg*s);
	var offy=offg*c;
	obj.position.x-=offx;
	obj.position.z-=offy;
}

function bapi_turn(rad,objid){
	var obj=vsc[objid];
	obj.rotation.z+=rad;
}

function bapi_keypressed(keyid){
	return(keypressed(keyid));
}

function keypressed(keyid){
	var out=false;
	try{
		out=keysdn["Key"+String(keyid.toUpperCase())];
	}catch(err){
		out=false;
	}
	return(out);
}

function download(data,fn){
	var blob,url,dum;
	blob=new Blob([data],{type:"application/octet-stream"});
	url=window.URL.createObjectURL(blob);
	dum=document.createElement("a");
	dum.href=url;
	dum.download=fn;
	document.body.appendChild(dum);
	dum.style.display="none";
	dum.click();
}

function openTutorials(){
	let tcode=`
		<p style="font-size:30px;color:white;">Tutorials
			<button id="tut_cancel" style="margin-left:8px;" class="cancel">Cancel</button></p>
		<p style="font-size:20px;color:white;">Here, you will learn how to use Donkey Game Maker.
		(as the title says)</p>
	`;
	let tuut=[];
	for(var tut in tuts){
		let tut_txt=tuts[tut][0];
		let tut_loc=tuts[tut][1];
		let tuutcode=`
			<div class="otuut" id="tut_${tut_loc}">
				<img class="ituut" src="assets/tuts/${tut}.png"/>
				<p style="color:white;font-size:20px;">${tut_txt}</p>
			</div>
		`;
		tuut.push(tuutcode);
	}
	let tuutstr=tuut.join("");
	tcode+=tuutstr;
	editDialog(tcode);
	document.getElementById("tut_cancel").addEventListener("click",function(){
		hideDialog();
	});
	for(var tut in tuts){
		var elem=document.getElementById("tut_"+tuts[tut][1]);
		elem.addEventListener("click",function(){
			openTutor(this.id.split("tut_")[1]);
			hideDialog();
		});
	}
	showDialog();
}

function openTutor(tutorial_id){
	var tut=tutorials_data[tutorial_id];
	tutor_disp=tut;
	tutor_disp_ind=0;
	updateTutor();
	showTutor();
}

function showTutor(){
	tutor.style.display='block';
}

function updateTutor(){
	let tutorcode=`
		<p>
			<button id="tutor_prev">Prev</button>
			<button id="tutor_next">Next</button>
			<button id="tutor_close">Close</button>
		</p>
	`;
	tutor.innerHTML=tutorcode+tutor_disp[tutor_disp_ind];
	document.getElementById("tutor_prev").addEventListener("click",function(){
		tutor_disp_ind--;
		if(tutor_disp_ind==-1){
			tutor_disp_ind=0;
		}
		updateTutor();
	});
	document.getElementById("tutor_next").addEventListener("click",function(){
		tutor_disp_ind++;
		if(tutor_disp_ind==tutor_disp.length){
			tutor_disp_ind=tutor_disp.length-1;
		}
		updateTutor();
	});
	document.getElementById("tutor_close").addEventListener("click",function(){
		hideTutor();
	});
}

function hideTutor(){
	tutor.style.display='none';
}

//server manager and external functions (obsolete)

function connectToServer(){
	smgr.conn();
}

function disconnectFromServer(){
	smgr.close();
}

function sendToServer(msg){
	smgr.ws.send(msg);
}

function updateWS(){
	updateShared();
}

function isShared(logic){
	var out=false;
	for(var i=0;i<logic.length;i++){
		if(logic[i].saveid="share"){
			out=true;
		}
	}
	return(out);
}

function getSharedObjectByName(name){
	var out=null;
	for(var i=0;i<scm.length;i++){
		if(scm[i]["name"]==name){
			if(isShared(scm[i]["logic"])){
				out=vsc[i];
			}
		}
	}
	return(out);
}

function updateShared(){
	for(var i=0;i<scm.length;i++){
		for(var ii=0;ii<scm[i]["logic"].length;ii++){
			if(scm[i]["logic"][ii].saveid=="share"){
				sendToServer("share:"+
					scm[i]["name"]+":"+
					String(vsc[i].position.x)+":"+
					String(vsc[i].position.y)+":"+
					String(vsc[i].position.z)+":"+
					String(vsc[i].rotation.x)+":"+
					String(vsc[i].rotation.y)+":"+
					String(vsc[i].rotation.z)
				);
			}
		}
	}
}

function srv_client(name,px,py,pz,rx,ry,rz){
	var assigned_player=getSharedPlayerByName(name);
	if(assigned_player!=undefined){
		assigned_object.position.set(
			px,
			py,
			pz
		);
		assigned_object.rotation.set(
			rx,
			ry,
			rz
		);
	}
}

function srv_share(object,px,py,pz,rx,ry,rz){
	var assigned_object=getSharedObjectByName(object);
	if(assigned_object!=undefined){
		assigned_object.position.set(
			px,
			py,
			pz
		);
		assigned_object.rotation.set(
			rx,
			ry,
			rz
		);
	}
}

function srv_msg(sender,value){
	wsraw_unread.push({"sender":sender,"value":value});
}

class ServerManager{
	constructor(ip="localhost",port=9001){
		this.port=port;
		this.ip=ip;
		this.full_ip="ws://"+this.ip+":"+String(this.port);
		this.ws=null;
	}
	conn(){
		function onopen(){
			this.send(cgid);
			showMessage("Connected successfully.");
		}
		function onclose(){
			if(running){
				showMessage("<b style='color:red;'>Error!</b>&nbspConnection closed.");
			}else{
				showMessage("Connection closed.");
			}
		}
		function onerror(e){
			showMessage("<b style='color:red;'>Error!</b>&nbspConnection closed.");
		}
		function onmessage(e){
			let msg=e.data;
			console.log("message from ws: "+msg);
			let sg=msg.split(":");
			if(sg[0]=="client"){
				srv_client(
					String(sg[1]),
					Number(sg[2]),
					Number(sg[3]),
					Number(sg[4]),
					Number(sg[5]),
					Number(sg[6]),
					Number(sg[7])
				);
			}
			if(sg[0]=="share"){
				srv_share(
					String(sg[1]),
					Number(sg[2]),
					Number(sg[3]),
					Number(sg[4]),
					Number(sg[5]),
					Number(sg[6]),
					Number(sg[7])
				);
			}
			if(sg[0]=="msg"){
				srv_msg(
					String(sg[1]),
					String(sg[2])
				);
			}
		}
		showMessage("Connecting...");
		this.ws=new WebSocket(this.full_ip);
		this.ws.onopen=onopen;
		this.ws.onmessage=onmessage;
		this.ws.onclose=onclose;
		this.ws.onerror=onerror;
	}
	close(){
		this.ws.close();
	}
}

//loader
class DGMLoader{
	constructor(elem){
		this.elem=elem;
	}
	loadFromText(txt){
		//constants
		const P_header_start="DONKEY3";
		const P_sector_splitter="|";
		const P_joint_start="<";
		const P_joint_end=">";
		//functions
		function clean(){
			tcontrols.detach();
			econtrols.detach();
			for(var i=0;i<sc.length;i++){
				sc[i].removeFromParent();
			}
			sc=[];
			scm=[];
		}
		function procobj(objdata){
			var nbj=ext[objdata["db"]].clone();
			nbj.material=nbj.material.clone();
			nbj.material.color=new THREE.Color(Number(objdata["mc"]));
			nbj.material.reflectivity=Number(objdata["mm"]);
			nbj.position.set(
				Number(objdata["px"]),
				Number(objdata["py"]),
				Number(objdata["pz"])
			);
			nbj.rotation.set(
				Number(objdata["rx"]),
				Number(objdata["ry"]),
				Number(objdata["rz"])
			);
			nbj.scale.set(
				Number(objdata["sx"]),
				Number(objdata["sy"]),
				Number(objdata["sz"])
			);
			if(objdata["tr"]=="%none"){
				sc.push(nbj);
				scm.push({
					"name":objdata["dn"],
					"logic":decomposeLogic(objdata["ld"]),
					"base":objdata["db"],
					"subbases":[]
				});
				scene.add(nbj);
			}else{
				sc[Number(objdata["tr"])].add(nbj);
				scm[Number(objdata["tr"])]["subbases"].push(objdata["db"]);
			}
		}
		function splitlist(txt){
			var ot=[];
			var state=0;
			var i=0;
			var span=0;
			var buffer="";
			var sizebuffer="";
			while(i<txt.length){
				let ltr=String(txt[i]);
				if(state==0){
					if(ltr==P_joint_start){
						if(i>=span){
							state=1;
						}
					}
				}else if(state==1){
					if(ltr==P_joint_end){
						state=2;
						span=i+Number(sizebuffer);
						sizebuffer="";
					}else{
						sizebuffer+=ltr;
					}
				}else if(state==2){
					if(ltr==P_joint_start){
						if(i>span){
							state=0;
							i--;
							ot.push(buffer);
							buffer="";
						}else{
							buffer+=ltr;
						}
					}else{
						buffer+=ltr;
					}
				}
				i++;
			}
			ot.push(buffer);
			return(ot);
		}
		function splitSectors(txt){
			var sect={
				"o":txt.split("|o")[1].split("|b")[0],
				"b":txt.split("|b")[1]
			};
			return(sect);
		}
		function buildProp(saveid,props){
			var final={};
			for(var prop in props){
				if(prop!="blkid"){
					final[prop]=props[prop];
				}
			}
			var f;
			if(saveid=="movekeys"){
				f=new KeyMovementComponent();
			}
			if(saveid=="movecursor"){
				f=new CursorMovementComponent();
			}
			if(saveid=="follow"){
				f=new FollowComponent();
			}
			if(saveid=="wander"){
				f=new WanderComponent();
			}
			if(saveid=="avoid"){
				f=new AvoidComponent();
			}
			if(saveid=="camerafollow"){
				f=new CameraTargetComponent();
			}
			if(saveid=="transfer"){
				f=new DataTransferComponent();
			}
			if(saveid=="blockly"){
				f=new BlocklyComponent(props["blkid"]);
			}
			if(saveid=="client"){
				f=new ClientComponent();
			}
			if(saveid=="share"){
				f=new ShareComponent();
			}
			f.properties=final;
			return(f);
		}
		function decomposeLogic(txt){
			var out=[];
			if(txt!=undefined){
				var logics=splitlist(txt);
				for(var i=0;i<logics.length;i++){
					var saveid=logics[i].split(/!(.+)/)[0];
					var proptxt=logics[i].split(/!(.+)/)[1];
					var propbuilder={};
					var propList=splitlist(proptxt);
					for(var prop=0;prop<propList.length;prop++){
						propbuilder[propList[prop].split(/=(.+)/)[0]]=String(propList[prop].split(/=(.+)/)[1]);
					}
					out.push(buildProp(saveid,propbuilder));
				}
			}
			return(out);
		}
		//getting ready
		works={};
		workc={};
		selection=0;
		clean();
		//sectors
		var sectors=splitSectors(txt);
		var scen=sectors["o"];
		var workspaces=sectors["b"];
		//blockly data
		workspaces=splitlist(workspaces);
		for(var wrk=0;wrk<workspaces.length;wrk++){
			var wrkcnt=workspaces[wrk].split(/!(.+)/);
			var wrkid=wrkcnt[0];
			var wrkcontent=wrkcnt[1];
			works[wrkid]=wrkcontent;
		}
		//scene data
		scen=splitlist(scen);
		for(var o=0;o<scen.length;o++){
			var objdata=scen[o];
			var objdata_lst=splitlist(objdata);
			var objdata={};
			for(var oi=0;oi<objdata_lst.length;oi++){
				var objcnt=objdata_lst[oi].split(/!(.+)/);
				var objdid=objcnt[0];
				var objdcontent=objcnt[1];
				objdata[objdid]=objdcontent;
			}
			procobj(objdata);
		}
		updateSubpanel();
	}
	writeToText(){
		//constants
		const P_header_start="DONKEY3";
		const P_sector_splitter="|";
		const P_sector_objects="o";
		const P_sector_blockly="b";
		const P_joint_start="<";
		const P_joint_end=">";
		const P_fakesector_objects="I"+P_sector_objects;
		const P_fakesector_blockly="I"+P_sector_blockly;
		//functions
		function joinlist(lst){
			let ot="";
			for(var i=0;i<lst.length;i++){
				var itm=String(lst[i]);
				var len=itm.length;
				ot+=P_joint_start;
				ot+=String(len);
				ot+=P_joint_end;
				ot+=itm;
			}
			return(ot);
		}
		function composeLogic(logic){
			var out=[];
			for(var i=0;i<logic.length;i++){
				var logicType=logic[i].saveid;
				var logicProps=logic[i].properties;
				var propList=[];
				for(var prop in logicProps){
					if(logicProps[prop]!=undefined&&logicProps[prop]!=""){
						propList.push(prop+"="+String(logicProps[prop]));
					}else{
						propList.push(prop+"= ");
					}
				}
				if(logicType=="blockly"){
					propList.push("blkid="+logic[i].codeslot);
				}
				var logicPropsTxt=joinlist(propList);
				out.push(logicType+"!"+logicPropsTxt);
			}
			return(joinlist(out));
		}
		//build scene sector
		var lobj=[];
		for(var i=0;i<sc.length;i++){
			var otable={
				"dp":String(""),
				"dn":String(scm[i]["name"]),
				"db":String(scm[i]["base"]),
				"mc":String(sc[i].material.color.getHex()),
				"mm":String(sc[i].material.reflectivity),
				"px":String(sc[i].position.x),
				"py":String(sc[i].position.y),
				"pz":String(sc[i].position.z),
				"rx":String(sc[i].rotation.x),
				"ry":String(sc[i].rotation.y),
				"rz":String(sc[i].rotation.z),
				"sx":String(sc[i].scale.x),
				"sy":String(sc[i].scale.y),
				"sz":String(sc[i].scale.z),
				"tr":String("%none"),
				"ld":String(composeLogic(scm[i]["logic"]))
			};
			var lobjs=[];
			for(var prop in otable){
				lobjs.push(prop+"!"+otable[prop]);
			}
			var oobjs=joinlist(lobjs);
			lobj.push(oobjs);
			var subobjects=sc[i].children;
			for(var sub=0;sub<subobjects.length;sub++){
				
					var subtable={
						"dp":String(""),
						"dn":String(["name"]),
						"db":String(scm[i]["subbases"][sub]),
						"mc":String(subobjects[sub].material.color.getHex()),
						"mm":String(subobjects[sub].material.reflectivity),
						"px":String(subobjects[sub].position.x),
						"py":String(subobjects[sub].position.y),
						"pz":String(subobjects[sub].position.z),
						"rx":String(subobjects[sub].rotation.x),
						"ry":String(subobjects[sub].rotation.y),
						"rz":String(subobjects[sub].rotation.z),
						"sx":String(subobjects[sub].scale.x),
						"sy":String(subobjects[sub].scale.y),
						"sz":String(subobjects[sub].scale.z),
						"tr":String(i)
					};
					var lobju=[];
					for(var prop in otable){
						lobju.push(prop+"!"+subtable[prop]);
					}
					var oobju=joinlist(lobju);
					lobj.push(oobju);
				
			}
		}
		var oobj=joinlist(lobj);
		//build blockly sector
		var lblk=[];
		for(var workspace in works){
			lblk.push(workspace+"!"+works[workspace]);
		}
		var oblk=joinlist(lblk);
		//clean up sector things
		oobj.replaceAll(P_sector_splitter+P_sector_objects,P_fakesector_objects);
		oblk.replaceAll(P_sector_splitter+P_sector_blockly,P_fakesector_blockly);
		//merge sectors
		var out=P_header_start+
			
			P_sector_splitter+
			P_sector_objects+
			oobj+
			
			P_sector_splitter+
			P_sector_blockly+
			oblk;
		return(out);
	}
	compress(data,cb){
		cb(data);
	}
	decompress(data){
		return(data);
	}
	
}

//the classes
class KeyMovementComponent{
	constructor(){
		this.saveid="movekeys";
		this.label="Key Movement";
		this.description="Move this object with keys";
		this.properties={
			"Speed factor":"1"
		};
	}
	execute(objid){
		var mainspeed=0.4;
		var speedfactor=Number(this.properties["Speed factor"]);
		var speed=mainspeed*speedfactor;
		var obj=vsc[objid];
		var ddy=0-speed;
		//find sin and cos stuff
		var s=Math.sin(0-obj.rotation.z);
		var c=Math.cos(0-obj.rotation.z);
		//find final offsets
		var offx=0-(ddy*s);
		var offy=ddy*c;
		var srr=new THREE.Vector2(
			offx,
			offy
		);
		if(keyspressed[0]){
			obj.position.x-=srr.x;
			obj.position.z-=srr.y;
		}
		if(keyspressed[1]){
			obj.rotation.z+=speed/10;
		}
		if(keyspressed[2]){
			obj.position.x+=srr.x;
			obj.position.z+=srr.y;
		}
		if(keyspressed[3]){
			obj.rotation.z-=speed/10;
		}
	}
}

class CursorMovementComponent{
	constructor(){
		this.saveid="movecursor";
		this.label="Cursor Movement";
		this.description="Move this object with cursor";
		this.properties={
			"Allow X movement (yes/no)":"yes",
			"Allow Y movement (yes/no)":"yes",
			"Movement factor":"1"
		};
		
		this.ppos=null;
	}
	execute(objid){
		var constfactor=0.01;
		var movfactor=Number(this.properties["Movement factor"]);
		var finalfactor=constfactor*movfactor;
		var allowX=this.properties["Allow X movement (yes/no)"]=="yes";
		var allowY=this.properties["Allow Y movement (yes/no)"]=="yes";
		if(this.ppos==null){
			this.ppos=new THREE.Vector2();
			this.ppos.x=pointer.x;
			this.ppos.y=pointer.y;
		}
		var cpos=new THREE.Vector2(
			pointer.x-this.ppos.x,
			pointer.y-this.ppos.y
		);
		this.ppos.x=pointer.x;
		this.ppos.y=pointer.y;
		if(allowX){
			vsc[objid].position.x+=cpos.x*finalfactor;
		}
		if(allowY){
			vsc[objid].position.z+=cpos.y*finalfactor;
		}
	}
}

class FollowComponent{
	constructor(){
		this.saveid="follow";
		this.label="Follow Object";
		this.description="Make this object follow another";
		this.properties={
			"Object to follow":"",
			"Speed factor":"0.75",
			"Change facing direction (yes/no)":"yes"
		};
	}
	execute(objid){
		var target_id=Number(findObjectFromName(this.properties["Object to follow"]));
		var mainspeed=0.4;
		var speedfactor=Number(this.properties["Speed factor"]);
		var speed=mainspeed*speedfactor;
		var changeFacing=this.properties["Change facing direction (yes/no)"]=="yes";
		if(target_id>-1){
			var source=vsc[objid];
			var target=vsc[target_id];
			var angleto=Math.atan2(
				source.position.x-target.position.x,
				source.position.z-target.position.z,
			);
			angleto+=180*rad;
			if(changeFacing){
				source.rotation.z=angleto;
			}
			angleto+=2*rad;
			var offg=0-speed;
			//find sin and cos stuff
			var s=Math.sin(0-angleto);
			var c=Math.cos(0-angleto);
			//find final offsets
			var offx=0-(offg*s);
			var offy=offg*c;
			source.position.x-=offx;
			source.position.z-=offy;
		}
	}
}

class WanderComponent{
	constructor(){
		this.saveid="wander";
		this.label="Wander around";
		this.description="Make this object wander around";
		this.properties={
			"Speed factor":"1",
			"Stand time factor":"2",
			"Move time factor":"0.75",
			"Randomise timing a bit (yes/no)":"yes",
			"Change facing direction (yes/no)":"yes"
		};
		
		this.moving=false;
		this.remains=1;
		this.direction=0;
		this.moffset=0;
		this.soffset=0;
	}
	execute(objid){
		var mainStandTime=100;
		var mainMoveTime=100;
		var mainSpeed=0.1;
		var factorStandTime=Number(this.properties["Stand time factor"]);
		var factorMoveTime=Number(this.properties["Move time factor"]);
		var factorSpeed=Number(this.properties["Speed factor"]);
		var standTime=(mainStandTime*factorStandTime)+this.soffset;
		var moveTime=(mainMoveTime*factorMoveTime)+this.moffset;
		var speed=mainSpeed*factorSpeed;
		var randomise=this.properties["Randomise timing a bit (yes/no)"]=="yes";
		var changedirection=this.properties["Change facing direction (yes/no)"]=="yes";
		var object=vsc[objid];
		if(this.moving){
			var remc=this.remains*moveTime;
			remc--;
			this.remains=remc/moveTime;
			if(remc<=0){
				this.moving=false;
				this.remains=1;
				if(randomise){
					this.soffset=random(-25,30);
				}
			}else{
				var offg=0-speed;
				//find sin and cos stuff
				var s=Math.sin(0-this.direction);
				var c=Math.cos(0-this.direction);
				//find final offsets
				var offx=0-(offg*s);
				var offy=offg*c;
				object.position.x-=offx;
				object.position.z-=offy;
			}
		}else{
			var remc=this.remains*standTime;
			remc--;
			this.remains=remc/standTime;
			if(remc<=0){
				this.moving=true;
				this.remains=1;
				if(randomise){
					this.moffset=random(-25,30);
					if(changedirection){
						this.direction=random(0,360)*rad;
						object.rotation.z=this.direction;
					}
				}
			}
		}
	}
}

class AvoidComponent{
	constructor(){
		this.saveid="avoid";
		this.label="Avoid Object";
		this.description="Make this object avoid another";
		this.properties={
			"Object to avoid":"",
			"Speed factor":"1",
			"Change facing direction (yes/no)":"yes"
		};
	}
	execute(objid){
		var target_id=Number(findObjectFromName(this.properties["Object to avoid"]));
		var mainspeed=0.4;
		var speedfactor=Number(this.properties["Speed factor"]);
		var speed=mainspeed*speedfactor;
		var changeFacing=this.properties["Change facing direction (yes/no)"]=="yes";
		if(target_id>-1){
			var source=vsc[objid];
			var target=vsc[target_id];
			var angleto=Math.atan2(
				source.position.x-target.position.x,
				source.position.z-target.position.z,
			);
			if(changeFacing){
				source.rotation.z=angleto;
			}
			angleto+=2*rad;
			var offg=0-speed;
			//find sin and cos stuff
			var s=Math.sin(0-angleto);
			var c=Math.cos(0-angleto);
			//find final offsets
			var offx=0-(offg*s);
			var offy=offg*c;
			source.position.x-=offx;
			source.position.z-=offy;
		}
	}
}

class CameraTargetComponent{
	constructor(){
		this.saveid="camerafollow";
		this.label="Camera follow";
		this.description="Target this object to be followed by the camera";
		this.properties={
			"Distance":"30",
			"Rotation (vertical)":"45",
			"First person mode":"no"
		};
	}
	execute(objid){
		var object=vsc[objid];
		var distance=Number(this.properties["Distance"]);
		var rotation=Number(this.properties["Rotation (vertical)"])*rad;
		var fpsm=this.properties["First person mode"]=="yes";
		if(!fpsm){
			var nx=0;
			var nz=distance+1;
			var ny=Math.tan(rotation)*nz;
			var nrx=0-rotation;
			var nry=0;
			var nrz=0;
			gcamera.position.x=object.position.x+nx;
			gcamera.position.y=object.position.y+ny;
			gcamera.position.z=object.position.z+nz;
			gcamera.rotation.x=nrx;
			gcamera.rotation.y=nry;
			gcamera.rotation.z=nrz;
		}else{
			object.visible=false;
			gcamera.position.x=object.position.x;
			gcamera.position.y=object.position.y+4;
			gcamera.position.z=object.position.z;
			gcamera.rotation.x=0;
			gcamera.rotation.y=object.rotation.z+(180*rad);
			gcamera.rotation.z=0;
		}
	}
}

class DataTransferComponent{
	constructor(){
		this.saveid="transfer";
		this.label="Data Transfer";
		this.description=`
			Transfer properties from this object to another.
			<br>Data IDs:<br>
			position-x, 
			position-y, 
			position-z, 
			position, 
			rotation-x, 
			rotation-y, 
			rotation-z, 
			rotation, 
			color, 
			metalness`;
		this.properties={
			"Data ID":"",
			"Target Object":"",
			"Offset (numeric data only)":"0"
		};
	}
	execute(objid){
		var did=this.properties["Data ID"];
		var tarid=Number(findObjectFromName(this.properties["Target Object"]));
		var offset=Number(this.properties["Offset (numeric data only)"]);
		var source=vsc[objid];
		var target=vsc[tarid];
		if(did=="position-x"){
			target.position.x=source.position.x+offset;
		}
		if(did=="position-y"){
			target.position.y=source.position.y+offset;
		}
		if(did=="position-z"){
			target.position.z=source.position.z+offset;
		}
		if(did=="position"){
			target.position.x=source.position.x+offset;
			target.position.y=source.position.y+offset;
			target.position.z=source.position.z+offset;
		}
		if(did=="rotation-x"){
			target.rotation.x=source.rotation.x+(offset*rad);
		}
		if(did=="rotation-y"){
			target.rotation.y=source.rotation.y+(offset*rad);
		}
		if(did=="rotation-z"){
			target.rotation.z=source.rotation.z+(offset*rad);
		}
		if(did=="rotation"){
			target.rotation.x=source.rotation.x+(offset*rad);
			target.rotation.y=source.rotation.y+(offset*rad);
			target.rotation.z=source.rotation.z+(offset*rad);
		}
		if(did=="color"){
			target.material.color=source.material.color;
		}
		if(did=="metalness"){
			target.material.reflectivity=source.material.reflectivity+(offset/100);
		}
	}
}

class BlocklyComponent{
	constructor(codeslot){
		this.saveid="blockly";
		this.label="Block program";
		this.description="A bit more advanced programming. Useful for really detailed games.";
		this.properties={
		};
		
		this.codeslot=codeslot;
		this.firstRun=true;
	}
	execute(objid){
			function getCurrentObject(){
				return(scm[objid]["name"]);
			}
			var code=workc[this.codeslot];
			eval(code);
			this.firstRun=false;
	}
}

class ClientComponent{
	constructor(){
		this.saveid="client";
		this.label="Use object for every remote player";
		this.description="This object will represent the player. There will be multiple clones of it, for each player in the game.";
		this.properties={
			"Enabled (y/n)":"y"
		};
	}
	execute(objid){
		if(this.properties["Enabled (y/n)"]=="y"){
			
		}
	}
}

class ShareComponent{
	constructor(){
		this.saveid="share";
		this.label="Share object between players.";
		this.description="If this object changes location in someone, it changes on everyone. Use it only when it is required, to avoid lag.";
		this.properties={
			"Enabled (y/n)":"y"
		};
	}
	execute(objid){
		if(this.properties["Enabled (y/n)"]=="y"){
			
		}
	}
}

//the bottom
document.addEventListener("DOMContentLoaded",init);

