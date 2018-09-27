!function(E,V,a){"use strict";var d="ht",C=E[d],k=null,W=Math,z=W.abs,f=W.max,h=Number.MAX_VALUE,Y=C.Default,O=Y.getInternal(),R=Y.clone,A=O.vec3TransformMat4,U=O.appendArray,X=function(){var D=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,d=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,w=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,_=function(n,p){return p=parseInt(p),p>=0?n[p-1]:n[p+n.length]},y=function(i,x,u,F,z,H){if(i.vs){var o=_(x,F),n=_(x,z),s=_(x,H),q=u.matrix,v=i.vs;if(u.flipFace){var b=n;n=s,s=b}q?(U(v,A(R(o),q)),U(v,A(R(n),q)),U(v,A(R(s),q))):(U(v,o),U(v,n),U(v,s))}},M=function(v,r,J,o,I,S){if(v.vs){var a=_(r,o),T=_(r,I),n=_(r,S),u=J.flipY;if(J.flipFace){var s=T;T=n,n=s}v.uv.push(a[0],u?1-a[1]:a[1],T[0],u?1-T[1]:T[1],n[0],u?1-n[1]:n[1])}},e=function(S,T,i,p,G,N){if(S.vs){var P=_(T,p),K=_(T,G),q=_(T,N),v=i.normalMatrix,w=S.ns;if(i.flipFace){var f=K;K=q,q=f}v?(U(w,A(R(P),v)),U(w,A(R(K),v)),U(w,A(R(q),v))):(U(w,P),U(w,K),U(w,q))}},i=function(_,R,T,Q,C,F,U,c){var w=Q&&Q.length&&c;F[3]===a?(y(_,R,C,F[0],F[1],F[2]),U&&M(_,T,C,U[0],U[1],U[2]),w&&e(_,Q,C,c[0],c[1],c[2])):(y(_,R,C,F[0],F[1],F[3]),y(_,R,C,F[1],F[2],F[3]),U&&(M(_,T,C,U[0],U[1],U[3]),M(_,T,C,U[1],U[2],U[3])),w&&(e(_,Q,C,c[0],c[1],c[3]),e(_,Q,C,c[1],c[2],c[3])))},F=function(C,a,B,i){var c,e,r,x,Q,K,y,Y=h,m=h,E=h,D=-h,k=-h,g=-h;for(c in C)for(K=C[c].vs,y=K.length,e=0;y>e;e+=3)r=K[e+0],x=K[e+1],Q=K[e+2],Y>r&&(Y=r),m>x&&(m=x),E>Q&&(E=Q),r>D&&(D=r),x>k&&(k=x),Q>g&&(g=Q);if(B){var L=Y+(D-Y)/2,Z=m+(k-m)/2,H=E+(g-E)/2;for(c in C)for(K=C[c].vs,y=K.length,e=0;y>e;e+=3)K[e+0]-=L,K[e+1]-=Z,K[e+2]-=H}var P,O,T;B?(P=D-Y,O=k-m,T=g-E):(P=2*f(z(Y),z(D)),O=2*f(z(m),z(k)),T=2*f(z(E),z(g))),i.rawS3=[P,O,T];for(c in C){if(K=C[c].vs,a)for(y=K.length,e=0;y>e;e+=3)P&&(K[e+0]/=P),O&&(K[e+1]/=O),T&&(K[e+2]/=T);C[c].rawS3=i.rawS3}};return function(M,A,K){if(!M)return k;(O.isString(A)||A instanceof ArrayBuffer)&&(A=s(A)),K||(K={}),K.flipY==k&&(K.flipY=!0),(K.s3||K.r3||K.t3||K.mat)&&(K.matrix=O.createWorldMatrix(K.mat,K.s3,K.r3,K.rotationMode,K.t3));var B,R,V,N,I,_,f=[],$=[],p=K.ignoreNormal?k:[],c=K.reverseFlipMtls,L={vs:[],uv:[],ns:p?[]:k},g={htdefault:L},a=new Z(M);for(p&&K.matrix&&(K.normalMatrix=O.createNormalMatrix(K.matrix));null!=(R=a.stepNext());)if(R=R.trim(),0!==R.length&&"#"!==R.charAt(0))if(V=D.exec(R))f.push([parseFloat(V[1]),parseFloat(V[2]),parseFloat(V[3])]);else if(V=d.exec(R))$.push([parseFloat(V[1]),parseFloat(V[2])]);else if(p&&(V=w.exec(R)))K.flipFace?p.push([parseFloat(-V[1]),parseFloat(-V[2]),parseFloat(-V[3])]):p.push([parseFloat(V[1]),parseFloat(V[2]),parseFloat(V[3])]);else if("f"===R[0]){var y=R.split(/\s+/);if(y.length<4)continue;var r,B,E,W=[],h=[],n=[];for(B=1,E=y.length;E>B;B++)r=y[B].split("/"),W.push(parseInt(r[0],10)),r.length>1&&r[1].length>0&&n.push(parseInt(r[1],10)),r.length>2&&r[2].length>0&&h.push(parseInt(r[2],10));for(B=0,E=W.length-2;E>B;B++)i(L,f,$,p,K,[W[0],W[B+1],W[B+2]],n.length?[n[0],n[B+1],n[B+2]]:k,h.length?[h[0],h[B+1],h[B+2]]:k)}else if(/^usemtl /.test(R)&&(N=R.substring(7).trim(),!(L=g[N]))){if(L={name:N,vs:[],uv:[],ns:p?[]:k},K.ignoreMtls&&K.ignoreMtls.indexOf(N)>=0&&delete L.vs,(K.reverseFlip||"*"===c||c&&c.indexOf(N)>=0)&&(L.reverseFlip=!0),A&&(I=A[N],I&&(K.ignoreColor||(L.color=I.kd),!K.ignoreTransparent&&I.d>0&&I.d<1&&(L.transparent=!0,L.opacity=I.d),!K.ignoreImage&&(_=I.map_kd)))){_=_.split(" ");var v=-1;for(B=0;B<_.length;B++)"-o"===_[B]?(L.uvOffset=[parseFloat(_[B+1]),parseFloat(_[B+2])],B+=2,v=B):"-s"===_[B]&&(L.uvScale=[parseFloat(_[B+1]),parseFloat(_[B+2])],B+=2,v=B);L.image=(K.prefix||"")+_.splice(v+1).join(" ")}g[N]=L}var o=[];for(var S in g){var z=g[S].vs;z&&0!==z.length||o.push(S)}o.forEach(function(a){delete g[a]}),F(g,K.cube,K.center,K);var J=K.shape3d;if(J){var l=[];for(var N in g){var L=g[N];l.rawS3=L.rawS3,l.push(L)}Y.setShape3dModel(J,l)}return g}}(),s=function(O){var j={};if(O)for(var V,G,B,C,n,E,S=new Z(O),N=/\s+/;null!=(G=S.stepNext());)G=G.trim(),0!==G.length&&"#"!==G.charAt(0)&&(B=G.indexOf(" "),C=(B?G.substring(0,B):G).toLowerCase(),n=(B?G.substring(B+1):"").trim(),"newmtl"===C?j[n]=V={name:n}:V&&("ka"===C||"kd"===C||"ks"===C?(E=n.split(N,3),V[C]=[parseFloat(E[0]),parseFloat(E[1]),parseFloat(E[2]),1]):V[C]="ns"===C||"d"===C?parseFloat(n):n));return j},Z=function(v){var X=this;if(v instanceof ArrayBuffer){X.isBuffer=!0;var A=0,q=new Uint8Array(v),k=q.length,J=q.length;X.stepNext=function(){for(var D,z,b=A;k>A;)if(D=q[A],z=D>>4,12===z||13==z)A+=2;else if(14===z)A+=3;else if(A++,10===D)return String.fromCharCode.apply(null,q.subarray(b,A));return A>b?String.fromCharCode.apply(null,q.subarray(b,A)):null}}else{X.isBuffer=!1;var K=v.split("\n"),M=0,J=K.length;X.stepNext=function(){return J>M?K[M++]:null}}};Z.prototype={},Z.prototype.constructor=Z,O.addMethod(Y,{loadObj:function(Z,w,p){p=p||{};var V=!1;/(MSIE |Trident\/|Edge\/)/.test(E.navigator.userAgent)&&(V=!0);var d=function(E){var K,d=p.finishFunc,n=p.shape3d,q=E?X(E[0],E[1],p):null;if(q){if(n)K=Y.getShape3dModel(n);else{K=[];for(var o in q){var U=q[o];K.rawS3=U.rawS3,K.push(U)}}d&&d(q,K,K.rawS3)}else d&&d(null)};if(V){var O=function(O){p.responseType="arraybuffer",Y.xhrLoad(Z,function(y){d([y,O])},p)};w?Y.xhrLoad(w,function(L){O(L)},p):O()}else Y.xhrLoad(w?[Z,w]:[Z],d,p)},parseObj:function(V,Y,y){return X(V,Y,y)}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);