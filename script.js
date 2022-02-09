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
	projectLoader;
//variables
var rad=(Math.PI/180);
var deg=(180/Math.PI);
var shadowbinds=[];
var ext={};
var cmapsize=400;
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
var econtrolobject=new THREE.Object3D();
var econtrack;
var edragged=false;
var accache=new THREE.Vector3(0,0,0);
var works={};
var workc={};
var blked={};
var globalslot;
var keysdn=[];
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
	"Program with blocks (Blockly) <img src='assets/must_try.png'>",
	"Use the object for every player in game (Multiplayer-only)",
	"Share the object to all the players (Multiplayer-only)"
];
var compSids=[
	"movekeys",
	"movecursor",
	"follow",
	"wander",
	"avoid",
	"camerafollow",
	"transfer",
	"blockly",
	"client",
	"share"
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
`;
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
	defaultMaterial=new THREE.MeshPhongMaterial({color:0xFFFFFF,side:THREE.DoubleSide,envMap:env,reflectivity:0});
	//controls!
	//	mapcontrols
	mapcontrols=new MapControls(camera,renderer.domElement);
	mapcontrols.minPolarAngle=0;
	mapcontrols.maxPolarAngle=rad*85;
	mapcontrols.minDistance=30;
	mapcontrols.maxDistance=300;
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
	var groundloader=new THREE.TextureLoader();
	groundloader.load("assets/ground.jpg",function(texture){
		texture.wrapS=THREE.RepeatWrapping;
		texture.wrapT=THREE.RepeatWrapping;
		texture.repeat.set(cmapsize/10,cmapsize/10);
		var ground=new THREE.Mesh(
			new THREE.PlaneGeometry(cmapsize,cmapsize),
			new THREE.MeshStandardMaterial({color:0x439130,side:THREE.DoubleSide,map:texture})
		);
		ground.position.set(0,0,0);
		ground.rotation.set(rad*90,0,0);
		scene.add(ground);
	});
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
	if(!running){
		if(tcontrols.dragging||econtrols.dragging){
			mapcontrols.enabled=false;
		}else{
			mapcontrols.enabled=true;
			mapcontrols.update();
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
function runtick(){
	for(var i=0;i<scm.length;i++){
		var logic=scm[i]["logic"];
		for(var comp=0;comp<logic.length;comp++){
			logic[comp].execute(i);
		}
	}
}

function run(){
	compileAll();
	virtualize();
	running=true;
	subwindow.style.display="none";
	stopbtn.style.display="block";
	mapcontrols.enabled=false;
	gcamera.position.x=camera.position.x;
	gcamera.position.y=camera.position.y;
	gcamera.position.z=camera.position.z;
	gcamera.rotation.x=camera.rotation.x;
	gcamera.rotation.y=camera.rotation.y;
	gcamera.rotation.z=camera.rotation.z;
}

function stop(){
	unvirtualize();
	running=false;
	subwindow.style.display="block";
	stopbtn.style.display="none";
	mapcontrols.enabled=true;
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
		<p><button id="logicadd_ok">OK</button><button id="logicadd_cancel">Cancel</button></p>
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
			<button id="me_qcsave" style="margin-left:8px;">Save and close</button>
			<button id="me_cancel" style="margin-left:8px;">Cancel</button></p>
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
	var final=`<p style="font-size:30px;color:white;">More Objects<button id="oo_cancel" style="margin-left:8px;">Cancel</button></p><p>`;
	for(var i=0;i<assets_names.length;i++){
		final+=`
			<div style='display:inline-block;' id='oo_p`+String(i)+`'>
				<img src='assets/moreobjects/`+assets_tl[i]+`.png' style='width:300px;height:200px;background:white;'>
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
		scm[selection]["name"]=window.prompt("Insert new name:",scm[selection]["name"]);
		updateSubpanel();
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
	subpanel=document.getElementById("subpanelc");
	dialog=document.getElementById("dialog");
	logicHtml=document.getElementById("logic");
	subwindow=document.getElementById("subpanel");
	stopbtn=document.getElementById("stopbtn");
	bdivp=document.getElementById("bdivp");
	bsnc=document.getElementById("bsnc");
	bsnc.addEventListener("click",saveQuit);
	stopbtn.addEventListener("click",stop);
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
		document.getElementById("qabout")
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
		<button id="subobject_add_cancel">
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
	}
	execute(objid){
			var code=workc[this.codeslot];
			eval(code);
	}
}

class ClientComponent{
	constructor{
		this.saveid="client";
		this.label="Use object for every remote player";
		this.properties={
		};
	}
	execute(objid){
		
	}
}

class ShareComponent{
	constructor{
		this.saveid="share";
		this.label="Share object between players.";
		this.properties={
		};
	}
	execute(objid){
		
	}
}

//the bottom
document.addEventListener("DOMContentLoaded",init);

