const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>60),{passive:true});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,end=+el.dataset.count,t0=performance.now();
  (function tick(t){const p=Math.min((t-t0)/1500,1);
    el.firstChild.textContent=Math.round(end*(1-Math.pow(1-p,3)));
    if(p<1)requestAnimationFrame(tick)})(t0);
  cio.unobserve(el);
}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

document.querySelectorAll('.member .more').forEach(m=>m.addEventListener('click',()=>{
  const card=m.closest('.member');card.classList.toggle('open');
  m.textContent=card.classList.contains('open')?'− CLOSE':'+ MORE';
}));

const EXTRAS=[
 ["x2024_meari.jpg",2024,"고령 청년 프로젝트 '꿈의 메아리'"],
 ["x2024_parktaejun14.jpg",2024,"제14회 박태준 기념음악회"],
 ["x2024_underscore.jpg",2024,"Underscore for Cinema"],
 ["x2024_sequence.jpg",2024,"Beyond The Sequence"],
 ["x2024_spring.jpg",2024,"봄의 콘서트"],
 ["x2023_byeol.jpg",2023,"고령 청년 in 프로젝트 '별 찌부 짜부'"],
 ["x2023_cinema.jpg",2023,"영화음악콘서트"],
 ["x2023_dongseongro.jpg",2023,"동성로 르네상스 프로젝트"],
 ["x2023_parktaejun13.jpg",2023,"제13회 박태준 기념음악회"],
 ["x2023_gagok.jpg",2023,"우리 가곡으로 본 대한민국"],
 ["x2022_forviola.jpg",2022,"For Viola"],
 ["x2022_parktaejun12.jpg",2022,"제12회 박태준 기념음악회"],
 ["x2022_dalseo.jpg",2022,"달서 페스티벌"],
 ["x2022_rising.jpg",2022,"유망예술가 발굴 프로젝트"],
 ["x2022_beethoven.jpg",2022,"베토벤의 밤"],
 ["x2021_talktoyou.jpg",2021,"Talk to You 프로젝트 콘서트"],
 ["x2021_blink.jpg",2021,"Blink of Summer"],
 ["x2021_startup.jpg",2021,"대구문화예술회관 기획연주 '스타트업'"],
 ["x2020_artist.jpg",2020,"수성아트피아 예술인 기 살리기 프로젝트"],
 ["x2020_som.jpg",2020,"Sound of Music"],
 ["x2018_academia.jpg",2018,"스페인 페스티벌 아카데미아"],
 ["x2017_talktoyou.jpg",2017,"Talk to You"],
 ["x2016_sujak.jpg",2016,"수작 콘서트"],
 ["x2016_lavita.jpg",2016,"La Vita è Bella"],
 ["x2016_springfest.jpg",2016,"대구 봄 앙상블 페스티벌"],
 ["x2016_romanza.jpg",2016,"낭만가객 로만짜"],
 ["x2016_track3.jpg",2016,"제3회 정기연주회 'Track3'"],
 ["x2015_3days.jpg",2015,"3Days Concert for Strings"],
 ["x2015_season2.jpg",2015,"Season 2"]
];
const eg=document.getElementById('extraGrid');
function renderExtras(){
  if(!eg)return;
  const d=DICT();
  eg.innerHTML=EXTRAS.map((row,i)=>{
    const cap=(LANG==='ko')?row[2]:((d.ex&&d.ex[i])||row[2]);
    return '<div class="pcard"><img src="assets/'+row[0]+'" alt="'+cap+'" loading="lazy"><div class="cap"><div class="y">'+row[1]+'</div><div class="t">'+cap+'</div></div></div>';
  }).join('');
  bindLightbox();
}
function togglePosters(){
  if(!eg)return;
  const btn=document.getElementById('pgbtn'),d=DICT();
  eg.classList.toggle('show');
  btn.textContent=eg.classList.contains('show')?d.pg_less:d.pg_more;
  bindLightbox();
}

const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg');
function bindLightbox(){
  document.querySelectorAll('.pcard:not([data-lb])').forEach(c=>{
    c.dataset.lb=1;
    c.addEventListener('click',()=>{lbimg.src=c.querySelector('img').src;lb.classList.add('open')});
  });
}
bindLightbox();
document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});

function toggleTimeline(){
  const tl=document.getElementById('timeline'),btn=document.getElementById('tlbtn'),d=DICT();
  if(!tl)return;
  tl.classList.toggle('full');
  btn.textContent=tl.classList.contains('full')?d.tl_less:d.tl_more;
}
function sendMail(f){
  const email=f.email?f.email.value:'',phone=f.phone?f.phone.value:'';
  const s=encodeURIComponent('[공연 섭외 문의 / Booking Inquiry] '+f.who.value);
  const b=encodeURIComponent('성함/소속 (Name/Org): '+f.who.value+'\n이메일 (Email): '+email+'\n연락처 (Phone): '+phone+'\n공연 유형 (Type): '+f.type.value+'\n희망 일시·장소 (Date/Venue): '+f.when.value+'\n\n문의 내용 (Message):\n'+f.msg.value);
  location.href='mailto:sosages90@hotmail.com?subject='+s+'&body='+b;
  return false;
}

/* ===================== i18n ===================== */
let LANG='ko';
const KO={};
const KO_UI={tl_more:'전체 연혁 보기 +',tl_less:'간략히 보기 −',pg_more:'전체 연주 스케치 보기 +',pg_less:'대표작만 보기 −'};
const T={
en:{
 n1:'About',n2:'History',n3:'Sketches',n4:'Members',n5:'Booking',
 h_sub:'A string ensemble of bold, vibrant young musicians',h_badge:'Designated Ensemble of Daegu Metropolitan City (2023)',
 a_h2:"Like our name — Hebrew for <b>'strength'</b> —<br>we craft the most solid sound<br>on stage.",
 a_p1:"<strong>Ensemble BOAZ</strong> began as a male string ensemble of Keimyung University graduates, opening with a sold-out debut concert in January 2015. With 1st prize at the Global Competition (chamber music) and the Busan Mayor's Award, the ensemble has grown through its annual concert series.",
 a_p2:"With studies in Germany and Italy, a solo invitation to the <strong>Tenerife International Festival</strong> in Spain and a <strong>2024 Japan tour (Kobe·Osaka)</strong>, BOAZ was designated an official ensemble of <strong>Daegu Metropolitan City in 2023</strong> and performs actively at home and abroad.",
 s_conc:'Annual Concerts',s_tour:'Countries Toured',s_shows:'Curated & Invited Shows',
 f_name_t:'Name',f_name:'Ensemble BOAZ',f_rep_t:'Directors',f_rep:'Lee Jung-min · Kang Kyung-shin',f_staff_t:'Administration',f_staff:'Han Jeong-su',f_found_t:'Founded',f_found:'2014',f_comp_t:'Formation',f_comp:'String ensemble (violin·viola·cello·piano·percussion)',f_desig_t:'Designation',f_desig:'Designated Ensemble of Daegu (2023)',
 hist_h2:'History',sk_h2:'Sketches',mem_h2:'Members',
 b26:"<b>6th Annual Concert 'No.6'</b> (Suseong Artpia) · Lobby Concert 'Rhythm of the Lobby – Piazzolla'",
 b25:"Gyeongbuk Foundation <b>'Beyond Four Seasons'</b> (Gyeongju Arts Center) · 'Texture of Winter' · Park Tae-jun Memorial Concert",
 b24:"<b>5th Annual Concert 'THE BOAZ'</b> (Daegu Concert House) · <b>1st Japan Concert</b> (Kobe·Osaka)",
 b23:"<b>Designated by Daegu Metropolitan City</b> · Daegu Int'l Music Festival · Founding of 'The BOAZ (Gyeongbuk)'",
 b22:"Expansion to orchestra scale · DSAC <b>Opera with BOAZ</b> (Dalseo Arts Center)",
 b21:"Daegu Artist Week <b>'Embrace (Pumda)'</b> (Daegu Concert House)",
 b20:"Shinsegae Dept. Store concerts · Suseong Artpia artist project",
 b19:"<b>'A Midsummer Night's Dream'</b> co-produced concert (Daegu Concert House)",
 b18:"Invited to <b>Tenerife International Festival</b>, Spain",
 b17:"<b>4th Annual Concert 'LUXURY TIME'</b>",
 b16:"3rd Annual Concert 'Track3' · Daegu Concert House Tuesday series",
 b15:"<b>Sold-out debut concert</b> · 1st Prize, Global Competition · Busan Mayor's Award",
 b14:'Founding of Ensemble BOAZ',
 d26_1:"6th Annual Concert 'No.6' — W. A. Mozart · Nam Jung-hun · M. Bruch (Suseong Artpia)",d26_2:"Lobby Concert 'Rhythm of the Lobby – Piazzolla' (Suseong Artpia Grand Theater Lobby, 2 Jul 2026)",
 d25_1:"'Beyond Four Seasons', Gyeongbuk Cultural Foundation (Gyeongju Arts Center)",d25_2:"'Texture of Winter' (December)",d25_3:"Goryeong outreach concerts, 4 performances",d25_4:"'Summer Dream Concert' with Daegu Children's Song Association",d25_5:"Park Tae-jun Memorial Concert",
 d24_1:"5th Annual Concert 'THE BOAZ' (Daegu Concert House Chamber Hall)",d24_2:"1st Japan Concert Ensemble BOAZ (Kobe · Osaka)",d24_3:"'Underscore for Cinema' (Acheleon Art Hall)",d24_4:"Spring Concert · 'Beyond The Sequence'",d24_5:"Goryeong youth project 'Echo of Dreams'",d24_6:"Healing Concert (Daegu Education Museum) · 14th Park Tae-jun Memorial Concert",
 d23_1:"Designated ensemble of Daegu Metropolitan City · founding of 'The BOAZ (Gyeongbuk)'",d23_2:"Daegu International Music Festival (Daegu Concert House)",d23_3:"Gyeongju Bomun lakeside concert · 'Korea Through Its Songs'",d23_4:"DAC Plus Stage outreach, 8 concerts · Dongseongno Renaissance Project · Film Music Concert",d23_5:"Goryeong youth project 'Byeol Jjibu Jjabu' · 13th Park Tae-jun Memorial Concert",
 d22_1:"Expansion to orchestra scale",d22_2:"DSAC Artist Project 'Opera with Ensemble BOAZ' (Dalseo Arts Center)",d22_3:"Suseong-gu 'Small Cultural Space' program · Night of Beethoven · Opera Journey",d22_4:"Dalseo Festival · 'For Viola' · 12th Park Tae-jun Memorial Concert",
 d21_1:"Daegu Artist Week Season 3 'Embrace' (Daegu Concert House)",d21_2:"Daegu Arts Center curated concert 'Start-up'",d21_3:"'Blink of Summer' · 'Talk to You' project concert",
 d20_1:"Daegu Shinsegae Tuesday Concerts",d20_2:"Suseong Artpia artist support project",d20_3:"'Sound of Music'",
 d19_1:"Co-produced concert 'A Midsummer Night's Dream' (Daegu Concert House)",
 d18_1:"XIV Festival Academia de Música Internacional, Tenerife (Spain)",
 d17_1:"4th Annual Concert 'LUXURY TIME'",d17_2:"'Talk to You'",
 d16_1:"3rd Annual Concert 'Track3'",d16_2:"Daegu Concert House Tuesday series · Daegu Spring Ensemble Festival",d16_3:"'Romanza' · 'La Vita è Bella' · Sujak Concert",d16_4:"2nd Prize, Paholo Competition · 3rd Prize, Gyeongju Int'l Competition (chamber)",
 d15_1:"Debut concert 'No.1 1mov' (Daegu Concert House) — sold out",d15_2:"'Season 2' · 3Days Concert",d15_3:"1st Prize & Grand Prize, Global Competition (chamber) · Busan Mayor's Award",
 tl_more:'View full history +',tl_less:'Show less −',pg_more:'View all sketches +',pg_less:'Highlights only −',sk_note:'Click an image to enlarge',
 p:["6th Annual Concert 'No.6'","Lobby Concert · Rhythm of the Lobby – Piazzolla","Texture of Winter","Beyond Four Seasons","1st Japan Concert · Kobe/Osaka","5th Annual Concert 'THE BOAZ'","Daegu International Music Festival","Opera Journey","Daegu Artist Week 'Embrace'","'A Midsummer Night's Dream'","Tenerife International Festival · Spain","4th Annual Concert 'LUXURY TIME'","Debut Concert (1st Annual)"],
 ex:["Goryeong Youth Project 'Echo of Dreams'","14th Park Tae-jun Memorial Concert","Underscore for Cinema","Beyond The Sequence","Spring Concert","Goryeong Youth Project 'Byeol Jjibu Jjabu'","Film Music Concert","Dongseongno Renaissance Project","13th Park Tae-jun Memorial Concert","Korea Through Its Songs","For Viola","12th Park Tae-jun Memorial Concert","Dalseo Festival","Rising Artists Project","Night of Beethoven","Talk to You Project Concert","Blink of Summer","Daegu Arts Center 'Start-up'","Suseong Artpia Artist Support Project","Sound of Music","Festival Academia · Spain","Talk to You","Sujak Concert","La Vita è Bella","Daegu Spring Ensemble Festival","'Romanza'","3rd Annual Concert 'Track3'","3Days Concert for Strings","Season 2"],
 mn:["Lee Jung-min","Kang Kyung-shin","Park Nu-ri","Han Hye-min","Choi Su-hyuk","Kim Sung-won","Kim Bo-seok","Oh Kuk-hwan","Lee Hee-su","Kim Kyung-won","Nam Jung-hun"],
 mt:["Co-Director","Co-Director","Guest Concertmaster, major German orchestras","Concertmaster, Korea Sori Chamber Orchestra","Member, Ensemble BOAZ","Member, Ensemble BOAZ","Director of On Violin","Music Director of Sorigyeol · Leader of SoundT","Principal Cellist, Gyeongsan Philharmonic","Member, Ensemble BOAZ","Lecturer, Keimyung University · The BOAZ"],
 mb:[["Gyeongbuk Arts High School","B.M. & M.M. in Orchestral Music, Keimyung University","Vordiplom, HfM Detmold, Germany","Diploma, Accademia Internazionale di Musica, Rome","Diploma, Festival Academia de Música Internacional de Tenerife, Spain","Winner & prizewinner of numerous competitions incl. Daejeon Music Assoc., Global & Han-Mi","Curated & invited ensemble performances in Spain, Eumak Chunchu and more","Former guest principal & member: DIOO, Daegu Philharmonic, Gimcheon Philharmonic, Daegu Strings","Former member: Daegu International Opera Orchestra, WOS Virtuoso Chamber","Co-Director of Ensemble BOAZ · Member, Daegu Virtuoso Chamber"],
 ["B.M. & M.M. in Piano, Keimyung University","Opera coaching diploma, Conservatorio G. Verdi, Milan","Opera & chorus accompanist, Teatro Municipale di Piacenza","Accompanist for numerous operas incl. La Bohème, Nabucco, Don Carlo, La Traviata","Concerts & recitals with Richard Bonynge, Aprile Millo and others in Spain, Milan, Busseto and Tuscany","2nd Prize, Arona Int'l Competition · 3rd Prize, Massa Int'l Competition (Italy)","Prizewinner, Clara Schumann Int'l Competition (chamber music)","100+ performances of contemporary and new music","Lecturer, Gyeongbuk Arts High School · Coach, Honam Opera Company"],
 ["B.M., Daegu Catholic University College of Music","Master's degree, Hochschule für Musik Nürnberg","Former Concertmaster, Philharmonisches Orchester Hansestadt Lübeck","Former Principal, Oldenburgisches Staatsorchester","Guest Concertmaster: Staatsoper Hamburg · Norddeutsche Philharmonie Rostock · Theater Kiel · SH Landesorchester Flensburg · Staatsoper Hannover · Staatsorchester Braunschweig"],
 ["Gyeongbuk Arts High School","Graduated top of class, Daegu Catholic University","Konzertexamen, HfM Detmold, Germany","Former soloist, Detmold Barock Orchester","Soloist with Debrecen (Hungary), Daegu Philharmonic, DCU Orchestra and more","Recitals & chamber music at Schloss Corvey (Höxter), Detmold Konzerthaus, Sejong Center","Concertmaster, Korea Sori Chamber Orchestra & The Gateum Orchestra","Lecturer, Gyeongbuk Arts HS · Member, Daegu Virtuoso Chamber"],
 ["B.M. in Orchestral Music, Keimyung University","Graduate studies, Kyungpook National University","1st prizes & awards: Keimyung, Daegu Strings, Philharmonie, Daegu Music Assoc., Paholo Competitions","Performances at Daegu Concert House, Suseong Artpia curated series, Daegu Chamber Music Festival and more","Member of Ensemble BOAZ"],
 ["Gimcheon Arts High School","B.M. in Orchestral Music, Keimyung University","1st Prize (ensemble), Mozart Competition Gwangju · 2nd Prize, Yejeon Music Competition · Young Artist Grand Prize","Member of Ensemble BOAZ"],
 ["B.M. in Orchestral Music, Keimyung University","Director of On Violin","Member: Bohème Ensemble · Gyeongju Chamber Orchestra · Bohemian Ensemble","Member of Ensemble BOAZ"],
 ["Diplom, Rostock University of Music","M.M. & Konzertexamen, HfM Detmold","Conducting studies, Brahms Conservatory Hamburg","Lecturer: Daegu Catholic Univ. · Daegu Nat'l Univ. of Education · Gyeongbuk Arts HS · Daegu Arts Gifted Education Center","Conductor: Suseong Pops Orchestra · Maruhan Youth Orchestra · Gunwi 'NEOM' Orchestra · 'Promise' Chamber Orchestra","Principal Cellist: CM Symphony Orchestra · Maruhan Philharmonic","Music Director of 'Sorigyeol' · Leader of SoundT Ensemble","Member: Daegu Virtuoso Chamber · Soloist Cello Ensemble Gyeongsang · Ensemble BOAZ · Canticum Novum Mission Choir · Pastorale"],
 ["Gyeongbuk Arts High School","B.A., Korea National University of Arts","Master's degree, Hochschule für Musik Dresden","Winner & prizewinner of numerous competitions (Daegu·Masan·Daejeon Music Assoc., Seongjeong Competition, Eumak Journal, Eumak Chunchu)","Soloist with Daegu Philharmonic and other orchestras","Guest player with Ditto Orchestra, Cheonan & Gyeongbuk Philharmonics · guest principal of Dio Orchestra & Grand Symphony","Invited performances: Tenerife Music Festival, Jeju Int'l Music Festival, Youngsan Art Hall, Franz Classic","Member: Ensemble BOAZ · Ensemble Sol · Ensemble Neustadt · Daegu KBS Project Ensemble · Ensemble Beyond · Soloist Cello Ensemble Gyeongsang · The Cellist of KNUA · Ensemble Sono / Principal Cellist, Gyeongsan Philharmonic"],
 ["Gyeongbuk Arts High School, Orchestral Music","B.M. in Orchestral Music, Yeungnam University","Solo percussion recital","Cultural exchange concerts in 7 countries across Europe & ASEAN","Member: Daegu Int'l Broadcasting Symphony · Tagadaga Art Company · CM Orchestra · Stadtphil · Ensemble BOAZ"],
 ["B.M. in Composition, Keimyung University","M.M. & Meisterklasse, Hochschule für Musik und Theater München","3rd Prize, Jean Sibelius International Competition 2015 (composition)","1st Prize, George Enescu International Competition 2018 (chamber music)","2nd Prize, Weimar International Competition 2020 (orchestral composition)"]],
 c_lede:"When the moment calls for a stage of distinction,<br>BOAZ is there with you.",
 c_desc:"Curated concerts · corporate & institutional events · celebratory performances · festival invitations — we join stages of every kind.",
 cl1:'Administration',cl2:'Phone',cl3:'Email',cl4:'Directors',cl5:'Based in',c_staff:'Han Jeong-su',c_rep:'Lee Jung-min · Kang Kyung-shin',c_area:'Daegu·Gyeongbuk & nationwide (Korea)',
 fm_who:'Name / Organization',fm_who_ph:'John Doe / Arts Foundation',fm_email:'Email (for reply)',fm_email_ph:'you@example.com',fm_phone:'Phone',fm_phone_ph:'+82 10-0000-0000',fm_type:'Type of Event',o1:'Curated concert',o2:'Corporate · institutional event',o3:'Celebratory performance',o4:'Festival invitation',o5:'Other',
 fm_when:'Preferred Date & Venue',fm_when_ph:'September 2026 / Daegu',fm_msg:'Message',fm_msg_ph:'Scale, budget, program preferences, etc.',
 fm_note:'※ Clicking SEND opens your email app with the message pre-filled.',
 foot:'Administration: Han Jeong-su +82-10-2870-9539 · sosages90@hotmail.com<br>Since 2014 · Designated Ensemble of Daegu (2023) · © 2026 Ensemble BOAZ',
 exp_h2:'Explore',exp_lead:'Discover Ensemble BOAZ',exp2:'From our 2014 founding to today',exp3:'Posters & moments from our stages',exp4:'The musicians of BOAZ',exp5:'Invite BOAZ to your stage',exp_view:'VIEW'
},
de:{
 n1:'Über uns',n2:'Geschichte',n3:'Galerie',n4:'Mitglieder',n5:'Kontakt',
 h_sub:'Ein Streicherensemble junger, kraftvoller Musiker',h_badge:'Offizielles Ensemble der Stadt Daegu (2023)',
 a_h2:'Wie unser Name — hebräisch für <b>„Stärke“</b> —<br>formen wir den festesten Klang<br>auf der Bühne.',
 a_p1:'<strong>Ensemble BOAZ</strong> entstand als Streicherensemble von Absolventen der Keimyung-Universität und debütierte im Januar 2015 mit einem ausverkauften Konzert. Mit dem 1. Preis beim Global-Wettbewerb (Kammermusik) und dem Preis des Bürgermeisters von Busan wuchs das Ensemble durch seine jährliche Konzertreihe.',
 a_p2:'Nach Studien in Deutschland und Italien, einer Einladung zum <strong>Internationalen Festival auf Teneriffa</strong> (Spanien) und einer <strong>Japan-Tournee 2024 (Kobe·Osaka)</strong> wurde BOAZ <strong>2023 zum offiziellen Ensemble der Stadt Daegu</strong> ernannt.',
 s_conc:'Jahreskonzerte',s_tour:'Tournee-Länder',s_shows:'Kuratierte Konzerte',
 f_name_t:'Name',f_name:'Ensemble BOAZ',f_rep_t:'Leitung',f_rep:'Lee Jung-min · Kang Kyung-shin',f_staff_t:'Verwaltung',f_staff:'Han Jeong-su',f_found_t:'Gegründet',f_found:'2014',f_comp_t:'Besetzung',f_comp:'Streicherensemble (Violine·Viola·Cello·Klavier·Schlagwerk)',f_desig_t:'Auszeichnung',f_desig:'Offizielles Ensemble der Stadt Daegu (2023)',
 hist_h2:'Geschichte',sk_h2:'Galerie',mem_h2:'Mitglieder',
 b26:'<b>6. Jahreskonzert „No.6“</b> (Suseong Artpia) · Foyerkonzert „Rhythmus des Foyers – Piazzolla“',b25:'<b>„Beyond Four Seasons“</b> (Gyeongju Arts Center) · „Textur des Winters“ · Park-Tae-jun-Gedenkkonzert',b24:'<b>5. Jahreskonzert „THE BOAZ“</b> (Daegu Concert House) · <b>1. Japan-Konzert</b> (Kobe·Osaka)',b23:'<b>Ernennung zum Ensemble der Stadt Daegu</b> · Daegu Int. Musikfestival · Gründung von „The BOAZ (Gyeongbuk)“',b22:'Erweiterung zum Orchester · DSAC <b>Opera with BOAZ</b> (Dalseo Arts Center)',b21:'Daegu Artist Week <b>„Embrace (Pumda)“</b> (Daegu Concert House)',b20:'Shinsegae-Konzerte · Suseong-Artpia-Künstlerprojekt',b19:'<b>„Ein Sommernachtstraum“</b> Gemeinschaftskonzert (Daegu Concert House)',b18:'Einladung zum <b>Internationalen Festival auf Teneriffa</b>, Spanien',b17:'<b>4. Jahreskonzert „LUXURY TIME“</b>',b16:'3. Jahreskonzert „Track3“ · Dienstagsreihe im Daegu Concert House',b15:'<b>Ausverkauftes Debütkonzert</b> · 1. Preis Global-Wettbewerb · Preis des Bürgermeisters von Busan',b14:'Gründung des Ensemble BOAZ',
 tl_more:'Vollständige Geschichte +',tl_less:'Weniger anzeigen −',pg_more:'Alle Plakate ansehen +',pg_less:'Nur Highlights −',sk_note:'Bild anklicken zum Vergrößern',
 c_lede:'Wenn der Moment eine besondere Bühne verlangt,<br>ist BOAZ an Ihrer Seite.',c_desc:'Kuratierte Konzerte · Firmen- und Institutionsveranstaltungen · festliche Auftritte · Festival-Einladungen.',
 cl1:'Verwaltung',cl2:'Telefon',cl3:'E-Mail',cl4:'Leitung',cl5:'Standort',c_area:'Daegu·Gyeongbuk & ganz Korea',
 fm_who:'Name / Organisation',fm_type:'Art der Veranstaltung',o1:'Kuratiertes Konzert',o2:'Firmen-/Institutionsevent',o3:'Festlicher Auftritt',o4:'Festival-Einladung',o5:'Sonstiges',fm_when:'Wunschtermin & Ort',fm_msg:'Nachricht',fm_msg_ph:'Umfang, Budget, Programmwünsche usw.',
 fm_note:'※ Ein Klick öffnet Ihre E-Mail-App mit vorausgefülltem Text.',
 foot:'Verwaltung: Han Jeong-su +82-10-2870-9539 · sosages90@hotmail.com<br>Seit 2014 · Offizielles Ensemble der Stadt Daegu (2023) · © 2026 Ensemble BOAZ'
},
es:{
 n1:'Nosotros',n2:'Historia',n3:'Galería',n4:'Miembros',n5:'Contacto',
 h_sub:'Un ensamble de cuerdas de músicos jóvenes y vibrantes',h_badge:'Conjunto designado por la Ciudad de Daegu (2023)',
 a_h2:"Como nuestro nombre — <b>'fuerza'</b> en hebreo —<br>creamos el sonido más sólido<br>del escenario.",
 a_p1:'<strong>Ensemble BOAZ</strong> nació como un ensamble de cuerdas de graduados de la Universidad Keimyung y debutó en enero de 2015 con un concierto con entradas agotadas. Con el 1er premio del Concurso Global (música de cámara) y el Premio del Alcalde de Busan, el conjunto ha crecido con su serie anual de conciertos.',
 a_p2:'Tras estudios en Alemania e Italia, una invitación al <strong>Festival Internacional de Tenerife</strong> (España) y una <strong>gira por Japón en 2024 (Kobe·Osaka)</strong>, BOAZ fue designado conjunto oficial de la <strong>Ciudad de Daegu en 2023</strong>.',
 s_conc:'Conciertos anuales',s_tour:'Países de gira',s_shows:'Conciertos invitados',
 f_name_t:'Nombre',f_name:'Ensemble BOAZ',f_rep_t:'Directores',f_rep:'Lee Jung-min · Kang Kyung-shin',f_staff_t:'Administración',f_staff:'Han Jeong-su',f_found_t:'Fundación',f_found:'2014',f_comp_t:'Formación',f_comp:'Ensamble de cuerdas (violín·viola·violonchelo·piano·percusión)',f_desig_t:'Designación',f_desig:'Conjunto designado por Daegu (2023)',
 hist_h2:'Historia',sk_h2:'Galería',mem_h2:'Miembros',
 b26:"<b>6.º Concierto anual 'No.6'</b> (Suseong Artpia) · Concierto de vestíbulo 'Ritmo del vestíbulo – Piazzolla'",b25:"<b>'Beyond Four Seasons'</b> (Centro de Artes de Gyeongju) · 'Textura del invierno' · Concierto Park Tae-jun",b24:"<b>5.º Concierto anual 'THE BOAZ'</b> (Daegu Concert House) · <b>1.er Concierto en Japón</b> (Kobe·Osaka)",b23:"<b>Designación por la Ciudad de Daegu</b> · Festival Int. de Música de Daegu · Fundación de 'The BOAZ (Gyeongbuk)'",b22:'Expansión a escala orquestal · DSAC <b>Opera with BOAZ</b> (Dalseo Arts Center)',b21:"Daegu Artist Week <b>'Embrace (Pumda)'</b> (Daegu Concert House)",b20:'Conciertos Shinsegae · Proyecto de artistas Suseong Artpia',b19:"<b>'El sueño de una noche de verano'</b> concierto coproducido (Daegu Concert House)",b18:'Invitación al <b>Festival Internacional de Tenerife</b>, España',b17:"<b>4.º Concierto anual 'LUXURY TIME'</b>",b16:"3.er Concierto anual 'Track3' · Serie de martes del Daegu Concert House",b15:'<b>Debut con entradas agotadas</b> · 1.er premio Concurso Global · Premio del Alcalde de Busan',b14:'Fundación del Ensemble BOAZ',
 tl_more:'Ver historia completa +',tl_less:'Ver menos −',pg_more:'Ver todos los carteles +',pg_less:'Solo destacados −',sk_note:'Haga clic en una imagen para ampliarla',
 c_lede:'Cuando el momento exige un escenario con distinción,<br>BOAZ le acompaña.',c_desc:'Conciertos curados · eventos corporativos e institucionales · actuaciones de celebración · invitaciones a festivales.',
 cl1:'Administración',cl2:'Teléfono',cl3:'Correo',cl4:'Directores',cl5:'Sede',c_area:'Daegu·Gyeongbuk y toda Corea',
 fm_who:'Nombre / Organización',fm_type:'Tipo de evento',o1:'Concierto curado',o2:'Evento corporativo/institucional',o3:'Actuación de celebración',o4:'Invitación a festival',o5:'Otro',fm_when:'Fecha y lugar preferidos',fm_msg:'Mensaje',fm_msg_ph:'Escala, presupuesto, preferencias de programa, etc.',
 fm_note:'※ Al hacer clic se abre su aplicación de correo con el mensaje completado.',
 foot:'Administración: Han Jeong-su +82-10-2870-9539 · sosages90@hotmail.com<br>Desde 2014 · Conjunto designado por Daegu (2023) · © 2026 Ensemble BOAZ'
},
ja:{
 n1:'紹介',n2:'沿革',n3:'演奏スケッチ',n4:'メンバー',n5:'出演依頼',
 h_sub:'力強く活気あふれる若手演奏家による弦楽アンサンブル',h_badge:'2023年 大邱広域市指定団体',
 a_h2:'ヘブライ語で<b>「強さ」</b>を意味する名のように、<br>舞台の上で最も揺るぎない音を<br>作り続けます。',
 a_p1:'<strong>Ensemble BOAZ</strong>は啓明大学校出身の男性弦楽アンサンブルとして始まり、2015年1月、全席完売の創団演奏会で初舞台を飾りました。グローバルコンクール室内楽部門1位、釜山市長賞などで実力を証明し、毎年の定期演奏会とともに成長してきました。',
 a_p2:'ドイツ・イタリア留学、スペイン・<strong>テネリフェ国際フェスティバル単独招請</strong>、<strong>2024年日本公演（神戸・大阪）</strong>など国際舞台へ活動を広げ、<strong>2023年に大邱広域市指定団体</strong>に選定されました。',
 s_conc:'定期演奏会',s_tour:'海外公演国',s_shows:'企画・招待公演',
 f_name_t:'団体名',f_name:'Ensemble BOAZ（アンサンブル・ボアズ）',f_rep_t:'代表',f_rep:'イ・ジョンミン／カン・ギョンシン',f_staff_t:'事務局',f_staff:'ハン・ジョンス',f_found_t:'創団',f_found:'2014年',f_comp_t:'編成',f_comp:'弦楽アンサンブル（ヴァイオリン・ヴィオラ・チェロ・ピアノ・パーカッション）',f_desig_t:'指定',f_desig:'2023年 大邱広域市指定団体',
 hist_h2:'沿革',sk_h2:'演奏スケッチ',mem_h2:'メンバー',
 b26:'<b>第6回定期演奏会『No.6』</b>（水城アートピア小劇場）・ロビーコンサート『ロビーのリズム – ピアソラ』',b25:'慶北文化財団<b>『Beyond Four Seasons』</b>（慶州芸術の殿堂）・『冬の結』・朴泰俊記念音楽会',b24:'<b>第5回定期演奏会『THE BOAZ』</b>（大邱コンサートハウス）・<b>初日本公演</b>（神戸・大阪）',b23:'<b>大邱広域市指定団体に選定</b>・大邱国際音楽祭・『The BOAZ（慶北）』設立',b22:'オーケストラ規模に拡大・DSAC <b>Opera with BOAZ</b>（達西アートセンター）',b21:'大邱アーティストウィーク<b>『抱く（품다）』</b>（大邱コンサートハウス）',b20:'新世界百貨店企画演奏・水城アートピア芸術家プロジェクト',b19:'<b>『真夏の夜の夢』</b>共同企画コンサート（大邱コンサートハウス）',b18:'スペイン<b>テネリフェ国際フェスティバル</b>招請演奏',b17:'<b>第4回定期演奏会『LUXURY TIME』</b>',b16:'第3回定期演奏会『Track3』・大邱コンサートハウス火曜企画演奏',b15:'<b>創団演奏会（全席完売）</b>・グローバルコンクール室内楽1位・釜山市長賞',b14:'Ensemble BOAZ 創団',
 d26_1:'第6回定期演奏会『No.6』— W. A. モーツァルト・ナム・ジョンフン・M. ブルッフ（水城アートピア小劇場）',d26_2:'ロビーコンサート『ロビーのリズム – ピアソラ』（2026.7.2、水城アートピア大劇場ロビー）',
 d25_1:'慶北文化財団支援『Beyond Four Seasons』（慶州芸術の殿堂）',d25_2:'『冬の結』（12月）',d25_3:'高霊巡回音楽会 4回',d25_4:'大邱童謡協会『Summer Dream Concert』',d25_5:'朴泰俊記念音楽会',
 d24_1:'第5回定期演奏会『THE BOAZ』（大邱コンサートハウス チェンバーホール）',d24_2:'初日本公演 Ensemble BOAZ（神戸・大阪）',d24_3:'『Underscore for Cinema』（アチェレンアートホール）',d24_4:'春のコンサート・『Beyond The Sequence』',d24_5:'高霊青年プロジェクト『夢のこだま』',d24_6:'ヒーリングコンサート（大邱教育博物館）・第14回朴泰俊記念音楽会',
 d23_1:'大邱広域市指定団体に選定・『The BOAZ（慶北）』設立',d23_2:'大邱国際音楽祭（大邱コンサートハウス）',d23_3:'慶州普門湖上公演・『歌曲で見る大韓民国』',d23_4:'DACプラスステージ巡回公演8回・東城路ルネサンス・映画音楽コンサート',d23_5:'高霊青年プロジェクト『ビョル・チブ・チャブ』・第13回朴泰俊記念音楽会',
 d22_1:'オーケストラ規模に拡大',d22_2:'DSAC『Opera with Ensemble BOAZ』（達西アートセンター）',d22_3:'水城区「小さな文化空間」事業・ベートーヴェンの夜・オペラの旅',d22_4:'達西フェスティバル・『For Viola』・第12回朴泰俊記念音楽会',
 d21_1:'大邱アーティストウィーク・シーズン3『抱く』（大邱コンサートハウス）',d21_2:'大邱文化芸術会館企画演奏『スタートアップ』',d21_3:'『Blink of Summer』・『Talk to You』プロジェクトコンサート',
 d20_1:'大邱新世界百貨店 火曜コンサート',d20_2:'水城アートピア芸術家支援プロジェクト',d20_3:'『Sound of Music』',
 d19_1:'共同企画コンサート『真夏の夜の夢』（大邱コンサートハウス）',
 d18_1:'第14回テネリフェ国際音楽アカデミーフェスティバル招請演奏（スペイン）',
 d17_1:'第4回定期演奏会『LUXURY TIME』',d17_2:'『Talk to You』',
 d16_1:'第3回定期演奏会『Track3』',d16_2:'大邱コンサートハウス火曜企画演奏・大邱春のアンサンブルフェスティバル',d16_3:'『ロマンツァ』・『La Vita è Bella』・秀作コンサート',d16_4:'パホロ音楽コンクール室内楽2位・慶州国際コンクール室内楽3位',
 d15_1:'創団演奏会『No.1 1mov』（大邱コンサートハウス）— 全席完売',d15_2:'『Season 2』・3Days Concert',d15_3:'グローバルコンクール室内楽1位および大賞・釜山市長賞',
 tl_more:'全沿革を見る +',tl_less:'簡略表示 −',pg_more:'すべてのスケッチを見る +',pg_less:'代表作のみ −',sk_note:'画像をクリックすると拡大できます',
 p:['第6回定期演奏会『No.6』','ロビーコンサート・ロビーのリズム – ピアソラ','冬の結','Beyond Four Seasons','1st Japan Concert・神戸/大阪','第5回定期演奏会『THE BOAZ』','大邱国際音楽祭','オペラの旅','大邱アーティストウィーク『抱く』','真夏の夜の夢','テネリフェ国際フェスティバル・スペイン','第4回定期演奏会『LUXURY TIME』','創団演奏会（第1回）'],
 ex:['高霊青年プロジェクト『夢のこだま』','第14回朴泰俊記念音楽会','Underscore for Cinema','Beyond The Sequence','春のコンサート','高霊青年プロジェクト『ビョル・チブ・チャブ』','映画音楽コンサート','東城路ルネサンスプロジェクト','第13回朴泰俊記念音楽会','歌曲で見る大韓民国','For Viola','第12回朴泰俊記念音楽会','達西フェスティバル','有望芸術家発掘プロジェクト','ベートーヴェンの夜','Talk to You プロジェクトコンサート','Blink of Summer','大邱文化芸術会館『スタートアップ』','水城アートピア芸術家支援プロジェクト','Sound of Music','フェスティバル・アカデミア（スペイン）','Talk to You','秀作コンサート','La Vita è Bella','大邱春のアンサンブルフェスティバル','『ロマンツァ』','第3回定期演奏会『Track3』','3Days Concert for Strings','Season 2'],
 mn:['イ・ジョンミン','カン・ギョンシン','パク・ヌリ','ハン・ヘミン','チェ・スヒョク','キム・ソンウォン','キム・ボソク','オ・グッファン','イ・ヒス','キム・ギョンウォン','ナム・ジョンフン'],
 mt:['共同代表','共同代表','ドイツ主要オーケストラ客員コンサートマスター','韓国ソリ室内管弦楽団コンサートマスター','Ensemble BOAZ 団員','Ensemble BOAZ 団員','オン・ヴァイオリン代表','ソリギョル音楽監督・SoundT団長','慶山市立交響楽団チェロ首席','Ensemble BOAZ 団員','啓明大学校講師・The BOAZ'],
 mb:[['慶北芸術高校卒業','啓明大学校管弦楽科および同大学院卒業','独デトモルト音楽大学 Vordiplom','ローマ国際音楽アカデミー ディプロマ','スペイン・テネリフェ国際音楽アカデミーフェスティバル ディプロマ','大田音楽協会、グローバル、韓米コンクールなど多数優勝・入賞','スペイン、音楽春秋などで多彩なアンサンブル企画・招請演奏','DIOO、大邱市立交響楽団、金泉市立交響楽団、大邱ストリングス 客員首席・団員歴任','大邱国際オペラ管弦楽団、WOSビルトゥオーゾチェンバー団員歴任','現）Ensemble BOAZ 共同代表・大邱ビルトゥオーゾチェンバー団員'],
 ['啓明大学校ピアノ科および同大学院卒業','伊ミラノ・ヴェルディ国立音楽院オペラコーチ科卒業','伊ピアチェンツァ市立劇場 オペラ・合唱伴奏','『ラ・ボエーム』『ナブッコ』『ドン・カルロ』『椿姫』など多数のオペラ伴奏','リチャード・ボニング、アプリーレ・ミッロらとスペイン、ミラノ、ブッセート、トスカーナなどで多数の演奏会・伴奏','伊アローナ国際コンクール2位、マッサ国際コンクール3位','クララ・シューマン国際コンクール室内楽部門入賞','現代音楽・創作曲演奏 100回以上','現）慶北芸術高校講師・湖南オペラ団音楽コーチ'],
 ['大邱カトリック大学音楽大学卒業','独ニュルンベルク音楽大学修士','リューベック・フィルハーモニー コンサートマスター歴任','オルデンブルク州立管弦楽団 首席歴任','ハンブルク州立歌劇場・北ドイツフィル（ロストック）・キール劇場・フレンスブルク州立管弦楽団・ハノーファー州立歌劇場・ブラウンシュヴァイク州立管弦楽団 客員コンサートマスター'],
 ['慶北芸術高校卒業','大邱カトリック大学首席卒業','独デトモルト音楽大学 専門演奏家課程修了','独デトモルト・バロックオーケストラ ソリスト団員歴任','ハンガリー・デブレツェン、大邱フィル、大邱カトリック大学オーケストラなど多数協演','独ヘクスター・コルヴァイ城、デトモルト・コンツェルトハウス、世宗文化会館などで独奏会・室内楽多数','韓国ソリ室内管弦楽団・The Gateumオーケストラ コンサートマスター','現）慶北芸術高校講師・大邱ビルトゥオーゾチェンバー団員'],
 ['啓明大学校管弦楽科卒業','慶北大学校大学院 在学中','啓明大学コンクール、大邱ストリングス、大邱音協、パホロコンクールなど1位・入賞','大邱コンサートハウス、水城アートピア企画演奏、大邱室内楽祭など多数出演','Ensemble BOAZ 団員'],
 ['金泉芸術高校卒業','啓明大学校管弦楽科卒業','モーツァルトコンクール（光州）アンサンブル部門1位・芸田音楽コンクール2位・ヤングアーティスト最優秀賞','Ensemble BOAZ 団員'],
 ['啓明大学校管弦楽科卒業','現）オン・ヴァイオリン代表','ボエムアンサンブル・慶州チェンバーオーケストラ・ボヘミアンアンサンブル メンバー','Ensemble BOAZ 団員'],
 ['独ロストック音楽大学ディプロム','独デトモルト音楽大学修士・最高演奏家課程修了','独ハンブルク・ブラームス音楽院指揮科修了','現）大邱カトリック大学・大邱教育大学・慶北芸術高校・大邱芸術英才教育院 講師','現）水城ポップスオーケストラ・マルハン青少年オーケストラ・軍威中「ネオム」オーケストラ・「プロミス」チェンバーオーケストラ 指揮者','現）CMシンフォニーオーケストラ・マルハンフィルハーモニー チェロ首席団員','現）創作団体「ソリギョル」音楽監督・SoundTアンサンブル団長','現）大邱ビルトゥオーゾチェンバー・ソリストチェロアンサンブル慶尚・Ensemble BOAZ・カンティクム・ノヴム・パストラーレ 団員'],
 ['慶北芸術高校卒業','韓国芸術総合学校卒業','独ドレスデン音楽大学修士','大邱・馬山・大田音楽協会、ソンジョン音楽コンクールなど多数のコンクールで優勝・入賞','大邱市立交響楽団など複数の楽団と協演','ディト・オーケストラ、天安市立交響楽団、慶北道立交響楽団 客員、ディオ・グランドシンフォニー 客員首席','テネリフェ音楽祭、済州国際音楽祭、霊山アートホール、フランツクラシックなど招請演奏','現）Ensemble BOAZ・アンサンブルソル・アンサンブルノイシュタット・大邱KBSプロジェクトアンサンブル・アンサンブルビヨンド・ソリストチェロアンサンブル慶尚・The Cellist of KNUA・アンサンブルソノ メンバー、慶山市立交響楽団チェロ首席'],
 ['慶北芸術高校管弦楽科卒業','嶺南大学校音楽大学管弦楽科卒業','打楽器リサイタル開催','欧州・ASEAN 7か国文化交流演奏会に参加','現）大邱国際放送交響楽団・Tagadagaアートカンパニー・CMオーケストラ・シュタットフィル・Ensemble BOAZ 団員'],
 ['啓明大学校作曲科卒業','ミュンヘン音楽・演劇大学修士・最高演奏家課程修了','2015年シベリウス国際コンクール作曲部門3位','2018年エネスク国際コンクール室内楽作曲部門1位','2020年ワイマール国際コンクール管弦楽作曲部門2位']],
 c_lede:'格調高い舞台が必要な瞬間、<br>BOAZがご一緒します。',c_desc:'企画公演・企業/機関イベント・祝賀演奏・フェスティバル招請など、あらゆる舞台に伺います。',
 cl1:'事務局',cl2:'電話',cl3:'メール',cl4:'代表',cl5:'活動地域',c_staff:'ハン・ジョンス',c_rep:'イ・ジョンミン／カン・ギョンシン',c_area:'大邱・慶北および韓国全域',
 fm_who:'お名前／ご所属',fm_who_ph:'山田太郎／○○財団',fm_email:'メール（返信用）',fm_email_ph:'you@example.com',fm_phone:'連絡先（電話）',fm_phone_ph:'080-0000-0000',fm_type:'公演の種類',o1:'企画公演',o2:'企業・機関イベント',o3:'祝賀演奏',o4:'フェスティバル招請',o5:'その他',fm_when:'ご希望の日時・場所',fm_when_ph:'2026年9月／大邱',fm_msg:'お問い合わせ内容',fm_msg_ph:'公演規模・予算・プログラムのご希望など',
 fm_note:'※ ボタンを押すとメールアプリが開き、内容が自動入力されます。',
 foot:'事務局：ハン・ジョンス +82-10-2870-9539 · sosages90@hotmail.com<br>Since 2014 · 2023年大邱広域市指定団体 · © 2026 Ensemble BOAZ'
},
zh:{
 n1:'简介',n2:'沿革',n3:'演出掠影',n4:'成员',n5:'演出洽询',
 h_sub:'由充满活力的年轻演奏家组成的弦乐团',h_badge:'2023年大邱广域市指定团体',
 a_h2:'正如希伯来语中意为<b>“力量”</b>的名字，<br>我们在舞台上奏出<br>最坚实的声音。',
 a_p1:'<strong>Ensemble BOAZ</strong>由启明大学毕业生组成的男性弦乐团起步，2015年1月以全场售罄的创团音乐会登上首个舞台。曾获全球音乐比赛室内乐组第一名、釜山市长奖等，通过每年的定期音乐会不断成长。',
 a_p2:'乐团曾赴德国、意大利深造，受邀<strong>西班牙特内里费国际音乐节</strong>独家演出，并于<strong>2024年赴日本（神户·大阪）巡演</strong>，2023年被选定为<strong>大邱广域市指定团体</strong>，活跃于国内外舞台。',
 s_conc:'定期音乐会',s_tour:'海外巡演国家',s_shows:'特邀演出',
 f_name_t:'团体名称',f_name:'Ensemble BOAZ',f_rep_t:'代表',f_rep:'Lee Jung-min · Kang Kyung-shin',f_staff_t:'行政',f_staff:'Han Jeong-su',f_found_t:'创团',f_found:'2014年',f_comp_t:'编制',f_comp:'弦乐团（小提琴·中提琴·大提琴·钢琴·打击乐）',f_desig_t:'指定',f_desig:'2023年大邱广域市指定团体',
 hist_h2:'沿革',sk_h2:'演出掠影',mem_h2:'成员',
 b26:"<b>第六届定期音乐会'No.6'</b>（寿城Artpia小剧场）·大厅音乐会'大厅的节奏 – 皮亚佐拉'",b25:"庆北文化财团<b>'Beyond Four Seasons'</b>（庆州艺术殿堂）·'冬之结'·朴泰俊纪念音乐会",b24:"<b>第五届定期音乐会'THE BOAZ'</b>（大邱音乐厅）·<b>首次日本公演</b>（神户·大阪）",b23:"<b>入选大邱广域市指定团体</b>·大邱国际音乐节·成立'The BOAZ（庆北）'",b22:'扩编至管弦乐团规模·DSAC <b>Opera with BOAZ</b>（达西艺术中心）',b21:"大邱艺术家周<b>'拥抱（품다）'</b>（大邱音乐厅）",b20:'新世界百货企划演出·寿城Artpia艺术家项目',b19:'<b>《仲夏夜之梦》</b>联合企划音乐会（大邱音乐厅）',b18:'受邀<b>西班牙特内里费国际音乐节</b>演出',b17:"<b>第四届定期音乐会'LUXURY TIME'</b>",b16:"第三届定期音乐会'Track3'·大邱音乐厅周二企划演出",b15:'<b>创团音乐会（全场售罄）</b>·全球比赛室内乐第一名·釜山市长奖',b14:'Ensemble BOAZ 创团',
 d26_1:"第六届定期音乐会'No.6' — W. A. 莫扎特·南廷勋·M. 布鲁赫（寿城Artpia小剧场）",d26_2:"大厅音乐会'大厅的节奏 – 皮亚佐拉'（2026.7.2，寿城Artpia大剧场大厅）",
 d25_1:"庆北文化财团支持'Beyond Four Seasons'（庆州艺术殿堂）",d25_2:"'冬之结'（12月）",d25_3:'高灵巡回音乐会4场',d25_4:"大邱童谣协会'Summer Dream Concert'",d25_5:'朴泰俊纪念音乐会',
 d24_1:"第五届定期音乐会'THE BOAZ'（大邱音乐厅室内乐厅）",d24_2:'首次日本公演（神户·大阪）',d24_3:"'Underscore for Cinema'（Acheleon艺术厅）",d24_4:"春之音乐会·'Beyond The Sequence'",d24_5:"高灵青年项目'梦之回声'",d24_6:'治愈音乐会（大邱教育博物馆）·第14届朴泰俊纪念音乐会',
 d23_1:"入选大邱广域市指定团体·成立'The BOAZ（庆北）'",d23_2:'大邱国际音乐节（大邱音乐厅）',d23_3:"庆州普门水上演出·'以歌曲看大韩民国'",d23_4:'DAC Plus Stage巡回演出8场·东城路文艺复兴项目·电影音乐会',d23_5:"高灵青年项目'星星扁扁'·第13届朴泰俊纪念音乐会",
 d22_1:'扩编至管弦乐团规模',d22_2:"DSAC艺术家项目'Opera with Ensemble BOAZ'（达西艺术中心）",d22_3:"寿城区'小文化空间'项目·贝多芬之夜·歌剧之旅",d22_4:"达西艺术节·'For Viola'·第12届朴泰俊纪念音乐会",
 d21_1:"大邱艺术家周第三季'拥抱'（大邱音乐厅）",d21_2:"大邱文化艺术会馆企划演出'Start-up'",d21_3:"'Blink of Summer'·'Talk to You'项目音乐会",
 d20_1:'大邱新世界百货周二音乐会',d20_2:'寿城Artpia艺术家支援项目',d20_3:"'Sound of Music'",
 d19_1:'联合企划音乐会《仲夏夜之梦》（大邱音乐厅）',
 d18_1:'第14届特内里费国际音乐学院音乐节受邀演出（西班牙）',
 d17_1:"第四届定期音乐会'LUXURY TIME'",d17_2:"'Talk to You'",
 d16_1:"第三届定期音乐会'Track3'",d16_2:'大邱音乐厅周二企划演出·大邱春季室内乐节',d16_3:"'Romanza'·'La Vita è Bella'·秀作音乐会",d16_4:'Paholo音乐比赛室内乐组第二名·庆州国际比赛室内乐组第三名',
 d15_1:"创团音乐会'No.1 1mov'（大邱音乐厅）— 全场售罄",d15_2:"'Season 2'·3Days Concert",d15_3:'全球比赛室内乐组第一名及大奖·釜山市长奖',
 tl_more:'查看完整沿革 +',tl_less:'收起 −',pg_more:'查看全部海报 +',pg_less:'只看代表作 −',sk_note:'点击图片可放大',
 p:["第六届定期音乐会'No.6'",'大厅音乐会·大厅的节奏 – 皮亚佐拉','冬之结','Beyond Four Seasons','首次日本公演·神户/大阪',"第五届定期音乐会'THE BOAZ'",'大邱国际音乐节','歌剧之旅',"大邱艺术家周'拥抱'",'仲夏夜之梦','特内里费国际音乐节·西班牙',"第四届定期音乐会'LUXURY TIME'",'创团音乐会（第一届）'],
 ex:["高灵青年项目'梦之回声'",'第14届朴泰俊纪念音乐会','Underscore for Cinema','Beyond The Sequence','春之音乐会',"高灵青年项目'星星扁扁'",'电影音乐会','东城路文艺复兴项目','第13届朴泰俊纪念音乐会','以歌曲看大韩民国','For Viola','第12届朴泰俊纪念音乐会','达西艺术节','新锐艺术家发掘项目','贝多芬之夜','Talk to You 项目音乐会','Blink of Summer',"大邱文化艺术会馆'Start-up'",'寿城Artpia艺术家支援项目','Sound of Music','Festival Academia·西班牙','Talk to You','秀作音乐会','La Vita è Bella','大邱春季室内乐节',"'Romanza'","第三届定期音乐会'Track3'",'3Days Concert for Strings','Season 2'],
 mt:['联合代表','联合代表','德国主要乐团客座乐团首席','韩国Sori室内乐团首席','Ensemble BOAZ 成员','Ensemble BOAZ 成员','On Violin代表','Sorigyeol音乐总监·SoundT团长','庆山市立交响乐团大提琴首席','Ensemble BOAZ 成员','启明大学讲师·The BOAZ'],
 mb:[['庆北艺术高中毕业','启明大学管弦乐系及研究生院毕业','德国代特莫尔德音乐学院 Vordiplom','罗马国际音乐学院文凭','西班牙特内里费国际音乐节文凭','大田音协、Global、韩美等多项比赛冠军及获奖','在西班牙及音乐春秋等策划多场室内乐演出及受邀演出','曾任DIOO、大邱市立交响乐团、金泉市立交响乐团、大邱Strings客座首席及成员','曾任大邱国际歌剧管弦乐团、WOS Virtuoso室内乐团成员','现任 Ensemble BOAZ 联合代表·大邱Virtuoso室内乐团成员'],
 ['启明大学钢琴系及研究生院毕业','意大利米兰威尔第国立音乐学院歌剧指导专业毕业','意大利皮亚琴察市立剧院歌剧及合唱伴奏','《波西米亚人》《纳布科》《唐·卡洛》《茶花女》等多部歌剧伴奏','与Richard Bonynge、Aprile Millo等在西班牙、米兰、布塞托、托斯卡纳举办多场音乐会及伴奏','意大利阿罗纳国际比赛第二名、马萨国际比赛第三名','克拉拉·舒曼国际比赛室内乐组获奖','现代音乐及新作品演出100余场','现任庆北艺术高中讲师·湖南歌剧团音乐指导'],
 ['大邱天主教大学音乐学院毕业','德国纽伦堡音乐学院硕士','曾任吕贝克爱乐乐团乐团首席','曾任奥尔登堡国立管弦乐团首席','汉堡国立歌剧院·罗斯托克北德爱乐·基尔剧院·弗伦斯堡石荷州州立乐团·汉诺威国立歌剧院·不伦瑞克国立管弦乐团客座乐团首席'],
 ['庆北艺术高中毕业','大邱天主教大学以第一名毕业','德国代特莫尔德音乐学院专业演奏家课程毕业','曾任德国代特莫尔德巴洛克乐团独奏成员','与匈牙利德布勒森、大邱爱乐、大邱天主教大学乐团等多次协演','在德国Höxter Corvey城堡、代特莫尔德音乐厅、世宗文化会馆等举办多场独奏会及室内乐演出','现任韩国Sori室内乐团及The Gateum乐团首席','现任庆北艺术高中讲师·大邱Virtuoso室内乐团成员'],
 ['启明大学管弦乐系毕业','庆北大学研究生院在读','启明大学比赛、大邱Strings、大邱音协、Paholo比赛等第一名及获奖','多次出演大邱音乐厅、寿城Artpia企划演出、大邱室内乐节等','Ensemble BOAZ 成员'],
 ['金泉艺术高中毕业','启明大学管弦乐系毕业','光州莫扎特比赛重奏组第一名·艺田音乐比赛第二名·青年艺术家最优秀奖','Ensemble BOAZ 成员'],
 ['启明大学管弦乐系毕业','现任On Violin代表','Bohème乐团·庆州室内乐团·Bohemian乐团成员','Ensemble BOAZ 成员'],
 ['德国罗斯托克音乐学院文凭','德国代特莫尔德音乐学院硕士及最高演奏家课程','德国汉堡勃拉姆斯音乐学院指挥专业进修','现任大邱天主教大学·大邱教育大学·庆北艺术高中·大邱艺术英才教育院讲师','现任寿城流行管弦乐团·Maruhan青少年乐团·军威中学NEOM乐团·Promise室内乐团指挥','现任CM交响乐团·Maruhan爱乐乐团大提琴首席','现任创作团体Sorigyeol音乐总监·SoundT乐团团长','现任大邱Virtuoso室内乐团·Soloist Cello Ensemble庆尚·Ensemble BOAZ·Canticum Novum·Pastorale成员'],
 ['庆北艺术高中毕业','韩国艺术综合学校毕业','德国德累斯顿音乐学院硕士','大邱·马山·大田音协、圣亭音乐比赛等多项比赛冠军及获奖','与大邱市立交响乐团等多个乐团协演','Ditto乐团、天安市立交响乐团、庆北道立交响乐团客座，Dio乐团·Grand交响乐团客座首席','特内里费音乐节、济州国际音乐节、灵山艺术厅、Franz Classic等受邀演出','现任Ensemble BOAZ·Ensemble Sol·Ensemble Neustadt·大邱KBS项目乐团·Ensemble Beyond·Soloist Cello Ensemble庆尚·The Cellist of KNUA·Ensemble Sono成员，庆山市立交响乐团大提琴首席'],
 ['庆北艺术高中管弦乐系毕业','岭南大学音乐学院管弦乐系毕业','举办打击乐独奏会','参加欧洲·东盟7国文化交流音乐会','现任大邱国际广播交响乐团·Tagadaga艺术公司·CM管弦乐团·Stadtphil·Ensemble BOAZ成员'],
 ['启明大学作曲系毕业','慕尼黑音乐与戏剧大学硕士及大师班','2015年西贝柳斯国际比赛作曲组第三名','2018年埃内斯库国际比赛室内乐作曲组第一名','2020年魏玛国际比赛管弦乐作曲组第二名']],
 c_lede:'当您需要一场高品质的演出，<br>BOAZ与您同行。',c_desc:'企划演出·企业/机构活动·庆典演奏·音乐节邀请等，各类舞台均可洽询。',
 cl1:'行政',cl2:'电话',cl3:'邮箱',cl4:'代表',cl5:'活动地区',c_staff:'Han Jeong-su',c_rep:'Lee Jung-min · Kang Kyung-shin',c_area:'大邱·庆北及韩国全境',
 fm_who:'姓名／所属',fm_who_ph:'张三／○○文化财团',fm_email:'邮箱（回复用）',fm_email_ph:'you@example.com',fm_phone:'联系方式（电话）',fm_phone_ph:'手机号码',fm_type:'演出类型',o1:'企划演出',o2:'企业·机构活动',o3:'庆典演奏',o4:'音乐节邀请',o5:'其他',fm_when:'期望日期·地点',fm_when_ph:'2026年9月／大邱',fm_msg:'咨询内容',fm_msg_ph:'演出规模、预算、曲目要求等',
 fm_note:'※ 点击后将打开您的邮件应用并自动填写内容。',
 foot:'行政：Han Jeong-su +82-10-2870-9539 · sosages90@hotmail.com<br>Since 2014 · 2023年大邱广域市指定团体 · © 2026 Ensemble BOAZ'
},
th:{
 n1:'เกี่ยวกับเรา',n2:'ประวัติ',n3:'แกลเลอรี',n4:'สมาชิก',n5:'ติดต่อจ้างงาน',
 h_sub:'วงเครื่องสายของนักดนตรีรุ่นใหม่ที่เปี่ยมพลัง',h_badge:'วงดนตรีในสังกัดนครแทกู (2023)',
 a_h2:"ดั่งชื่อวงที่แปลว่า <b>'พลัง'</b> ในภาษาฮีบรู<br>เราสร้างเสียงที่หนักแน่นที่สุด<br>บนเวที",
 a_p1:'<strong>Ensemble BOAZ</strong> เริ่มต้นจากวงเครื่องสายชายของศิษย์เก่ามหาวิทยาลัยคเยมยอง เปิดตัวในเดือนมกราคม 2015 ด้วยคอนเสิร์ตที่บัตรขายหมด คว้ารางวัลที่ 1 การแข่งขัน Global (เชมเบอร์) และรางวัลนายกเทศมนตรีปูซาน เติบโตผ่านคอนเสิร์ตประจำปีอย่างต่อเนื่อง',
 a_p2:'จากการศึกษาในเยอรมนีและอิตาลี การแสดงรับเชิญที่<strong>เทศกาลดนตรีนานาชาติเตเนรีเฟ</strong> สเปน และ<strong>ทัวร์ญี่ปุ่นปี 2024 (โกเบ·โอซาก้า)</strong> BOAZ ได้รับเลือกเป็น<strong>วงในสังกัดนครแทกูในปี 2023</strong>',
 s_conc:'คอนเสิร์ตประจำปี',s_tour:'ประเทศที่ไปแสดง',s_shows:'การแสดงรับเชิญ',
 f_name_t:'ชื่อวง',f_name:'Ensemble BOAZ',f_rep_t:'ผู้อำนวยการ',f_rep:'Lee Jung-min · Kang Kyung-shin',f_staff_t:'ฝ่ายธุรการ',f_staff:'Han Jeong-su',f_found_t:'ก่อตั้ง',f_found:'2014',f_comp_t:'องค์ประกอบ',f_comp:'วงเครื่องสาย (ไวโอลิน·วิโอลา·เชลโล·เปียโน·เพอร์คัชชัน)',f_desig_t:'การรับรอง',f_desig:'วงในสังกัดนครแทกู (2023)',
 hist_h2:'ประวัติ',sk_h2:'แกลเลอรี',mem_h2:'สมาชิก',
 b26:"<b>คอนเสิร์ตประจำปีครั้งที่ 6 'No.6'</b> (Suseong Artpia) · Lobby Concert 'Rhythm of the Lobby – Piazzolla'",b25:"<b>'Beyond Four Seasons'</b> (Gyeongju Arts Center) · 'Texture of Winter' · คอนเสิร์ตรำลึก Park Tae-jun",b24:"<b>คอนเสิร์ตประจำปีครั้งที่ 5 'THE BOAZ'</b> (Daegu Concert House) · <b>คอนเสิร์ตญี่ปุ่นครั้งแรก</b> (โกเบ·โอซาก้า)",b23:"<b>ได้รับเลือกเป็นวงในสังกัดนครแทกู</b> · เทศกาลดนตรีนานาชาติแทกู · ก่อตั้ง 'The BOAZ (คย็องบุก)'",b22:'ขยายสู่ระดับออร์เคสตรา · DSAC <b>Opera with BOAZ</b> (Dalseo Arts Center)',b21:"Daegu Artist Week <b>'Embrace (Pumda)'</b> (Daegu Concert House)",b20:'คอนเสิร์ตห้างชินเซกเย · โครงการศิลปิน Suseong Artpia',b19:"<b>'A Midsummer Night's Dream'</b> คอนเสิร์ตร่วมผลิต (Daegu Concert House)",b18:'รับเชิญแสดงที่<b>เทศกาลนานาชาติเตเนรีเฟ</b> สเปน',b17:"<b>คอนเสิร์ตประจำปีครั้งที่ 4 'LUXURY TIME'</b>",b16:"คอนเสิร์ตประจำปีครั้งที่ 3 'Track3' · ซีรีส์วันอังคาร Daegu Concert House",b15:'<b>คอนเสิร์ตเปิดตัวบัตรขายหมด</b> · รางวัลที่ 1 Global Competition · รางวัลนายกเทศมนตรีปูซาน',b14:'ก่อตั้ง Ensemble BOAZ',
 tl_more:'ดูประวัติทั้งหมด +',tl_less:'ย่อ −',pg_more:'ดูโปสเตอร์ทั้งหมด +',pg_less:'เฉพาะไฮไลท์ −',sk_note:'คลิกที่ภาพเพื่อขยาย',
 c_lede:'เมื่อคุณต้องการเวทีที่ทรงคุณค่า<br>BOAZ พร้อมอยู่เคียงข้างคุณ',c_desc:'คอนเสิร์ตที่จัดทำพิเศษ · งานองค์กรและสถาบัน · การแสดงเฉลิมฉลอง · เทศกาลดนตรี',
 cl1:'ฝ่ายธุรการ',cl2:'โทรศัพท์',cl3:'อีเมล',cl4:'ผู้อำนวยการ',cl5:'พื้นที่กิจกรรม',c_area:'แทกู·คย็องบุก และทั่วเกาหลี',
 fm_who:'ชื่อ / สังกัด',fm_type:'ประเภทงานแสดง',o1:'คอนเสิร์ตที่จัดทำพิเศษ',o2:'งานองค์กร·สถาบัน',o3:'การแสดงเฉลิมฉลอง',o4:'เทศกาลดนตรี',o5:'อื่น ๆ',fm_when:'วันเวลาและสถานที่ที่ต้องการ',fm_msg:'ข้อความ',fm_msg_ph:'ขนาดงาน งบประมาณ โปรแกรมที่ต้องการ ฯลฯ',
 fm_note:'※ เมื่อกดส่ง แอปอีเมลจะเปิดขึ้นพร้อมข้อความที่กรอกให้อัตโนมัติ',
 foot:'ฝ่ายธุรการ: Han Jeong-su +82-10-2870-9539 · sosages90@hotmail.com<br>Since 2014 · วงในสังกัดนครแทกู (2023) · © 2026 Ensemble BOAZ'
}
};
function DICT(){return LANG==='ko'?Object.assign({},KO_UI,KO):Object.assign({},T.en,T[LANG]||{});}
function buildSnapshot(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{KO[el.dataset.i18n]=el.innerHTML});
  document.querySelectorAll('[data-ph]').forEach(el=>{KO[el.dataset.ph]=el.placeholder});
  KO.mn=[...document.querySelectorAll('.member-grid .member h3')].map(e=>e.textContent);
  KO.mt=[...document.querySelectorAll('.member-grid .member .title')].map(e=>e.textContent);
  KO.mb=[...document.querySelectorAll('.member-grid .member')].map(m=>[...m.querySelectorAll('li')].map(li=>li.textContent));
  KO.p=[...document.querySelectorAll('#posters .poster-grid:not(.extra) .cap .t')].map(e=>e.textContent);
}
function setLang(l){
  LANG=l;const d=DICT();
  document.documentElement.lang=l;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const v=d[el.dataset.i18n];if(v!==undefined)el.innerHTML=v});
  document.querySelectorAll('[data-ph]').forEach(el=>{const v=d[el.dataset.ph];if(v!==undefined)el.placeholder=v});
  document.querySelectorAll('.member-grid .member').forEach((m,i)=>{
    if(d.mn&&d.mn[i])m.querySelector('h3').textContent=d.mn[i];
    if(d.mt&&d.mt[i])m.querySelector('.title').textContent=d.mt[i];
    if(d.mb&&d.mb[i]){const lis=[...m.querySelectorAll('li')];lis.forEach((li,j)=>{if(d.mb[i][j])li.textContent=d.mb[i][j]})}
  });
  document.querySelectorAll('#posters .poster-grid:not(.extra) .cap .t').forEach((e,i)=>{if(d.p&&d.p[i])e.textContent=d.p[i]});
  const _tlb=document.getElementById('tlbtn'),_tl=document.getElementById('timeline');
  if(_tlb&&_tl)_tlb.textContent=_tl.classList.contains('full')?d.tl_less:d.tl_more;
  const _pgb=document.getElementById('pgbtn');
  if(_pgb&&eg)_pgb.textContent=eg.classList.contains('show')?d.pg_less:d.pg_more;
  renderExtras();
  const sel=document.getElementById('langSel');if(sel.value!==l)sel.value=l;
  try{localStorage.setItem('boaz-lang',l)}catch(e){}
}
buildSnapshot();
renderExtras();
try{const saved=localStorage.getItem('boaz-lang');if(saved&&saved!=='ko')setLang(saved)}catch(e){}
