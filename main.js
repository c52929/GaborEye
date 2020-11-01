'use strict';
{
	let patchList, judge, time;

	function reset() {
		patchList=[];
		for(let i=0; i<2; i++){
			for(let j=0; j<2; j++){
				for(let k=0; k<6; k++){
					patchList.splice(Math.floor(Math.random()*(12*i+6*j+k+1)),0,`${k}${['','r'][i]}`);
				}
			}
		}
		// console.log(patchList);
		for(let i=0; i<24; i++){
			const addPatch=document.createElement('img');
			addPatch.setAttribute('src',`img/patch${patchList[i].charAt(0)}.jpg`);
			if(patchList[i].length>1){
				addPatch.classList.add('rotate');
			}
			document.getElementById('patches').appendChild(addPatch);
		}
	}

	reset();
	check();

	function check(){
		judge=[];
		time=0;
		for(let i=0; i<24; i++){
			document.querySelectorAll('img')[i].addEventListener('click',()=>{
				if(patchList[i]!='none' && time==0){
					if(judge.indexOf(i)<0){
						judge.push(i);
					}else{
						judge.splice(judge.indexOf(i),1);
					}
					document.querySelectorAll('img')[i].classList.toggle('selected');
					// console.log(document.getElementsByClassName('selected'));
					if(judge.length>1){
						time=1;
						// console.log(judge);
						if(patchList[judge[0]]==patchList[judge[1]]){
							for(let j=0; j<2; j++){
								// console.log(patchList.indexOf(judge[j]));
								patchList[judge[j]]='none';
								document.getElementsByClassName('selected')[j].classList.add('correct');
							}
						}else{
							for(let j=0; j<2; j++){
								document.getElementsByClassName('selected')[j].classList.add('incorrect');
							}
						}
						setTimeout(() => {
							// console.log(judge);
							for(let j=0; j<2; j++){
								if(patchList[judge[0]]==patchList[judge[1]]){
									document.getElementsByClassName('selected')[0].classList.add('transparent');
								}else{
									document.getElementsByClassName('selected')[0].classList.remove('incorrect');
								}
								document.getElementsByClassName('selected')[0].classList.remove('selected');
							}
							judge=[];
							// console.log(patchList);

							let noneNum=0;
							for(let i=0; i<patchList.length; i++){
								if(patchList[i]=='none'){
									noneNum++;
								}else{
									break;
								}
							}
							time=0;
							if(noneNum==24){
								document.getElementById('patches').innerHTML='';
								reset();
								check();
							}
						}, 700);
					}
				}
			})
		}
	}
}