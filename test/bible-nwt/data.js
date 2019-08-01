var bibleEditions = [
	"NWT 1961",
	"NWT 1984",
	"NWT 2013",
	"NWT 2018",
	"ESV"
];

var editionIds = [
	"NWT1961",
	"NWT1984",
	"NWT2013",
	"NWT2018",
	"ESV"
];

var bibleVerses = [
[
	"Jesus spoke these things, and, raising his eyes to heaven, he said: Father, the hour has come; glorify your son, that your son may glorify you,",
	"Jesus spoke these things, and, raising his eyes to heaven, he said: Father, the hour has come; glorify your son, that your son may glorify you,",
	"Jesus spoke these things, and raising his eyes to heaven, he said: Father, the hour has come. Glorify your son so that your son may glorify you,",
	"Jesus spoke these things, and raising his eyes to heaven, he said: Father, the hour has come. Glorify your son so that your son may glorify you,",
	"When Jesus had spoken these words, he lifted up his eyes to heaven, and said, Father, the hour has come; glorify your Son that the Son may glorify you,"
],[
	"according as you have given him authority over all flesh, that, as regards the whole [number] whom you have given him, he may give them everlasting life.",
	"according as you have given him authority over all flesh, that, as regards the whole number whom you have given him, he may give them everlasting life.",
	"just as you have given him authority over all flesh, so that he may give everlasting life to all those whom you have given to him.",
	"just as you have given him authority over all flesh, so that he may give everlasting life to all those whom you have given to him.",
	"since you have given him authority over all flesh, to give eternal life to all whom you have given him."
],[
	"This means everlasting life their taking in knowledge of you: the only true God, and. of the one whom you sent forth, Jesus Christ.",
	"This means everlasting life, their taking in knowledge of you, the only true God, and of the one whom you sent forth, Jesus Christ.",
	"This means everlasting life, their coming to know you, the only true God, and the one whom you sent, Jesus Christ.",
	"This means everlasting life, their coming to know you, the only true God, and the one whom you sent, Jesus Christ.",
	"And this is eternal life, that they know you, the only true God, and Jesus Christ whom you have sent."
],[
	"I have glorified you on the earth having finished the work you have given me to do.",
	"I have glorified you on the earth, having finished the work you have given me to do.",
	"I have glorified you on the earth, having finished the work you have given me to do.",
	"I have glorified you on the earth, having finished the work you have given me to do.",
	"I glorified you on earth, having accomplished the work that you gave me to do."
],[
	"So now you, Father, glorify me alongside yourself with the glory that I had alongside you before the world was.",
	"So now you, Father, glorify me alongside yourself with the glory that I had alongside you before the world was.",
	"So now, Father, glorify me at your side with the glory that I had alongside you before the world was.",
	"So now, Father, glorify me at your side with the glory that I had alongside you before the world was.",
	"And now, Father, glorify me in your own presence with the glory that I had with you before the world existed."
],[
	"I have made your name manifest to the men you gave me out of the world. They were yours, and you gave them to me, and they have observed your word.",
	"I have made your name manifest to the men you gave me out of the world. They were yours, and you gave them to me, and they have observed your word.",
	"I have made your name manifest to the men whom you gave me out of the world. They were yours, and you gave them to me, and they have observed your word.",
	"I have made your name manifest to the men whom you gave me out of the world. They were yours, and you gave them to me, and they have observed your word.",
	"I have manifested your name to the people whom you gave me out of the world. Yours they were, and you gave them to me, and they have kept your word."
],[
	"They have now come to know that all the things you gave me are from you;",
	"They have now come to know that all the things you gave me are from you;",
	"Now they have come to know that all the things you gave me are from you;",
	"Now they have come to know that all the things you gave me are from you;",
	"Now they know that everything that you have given me is from you."
],[
	"because the sayings that you gave me I have given to them, and they have received them and have certainly come to know that I came out as your representative, and they have believed that you sent me forth.",
	"because the sayings that you gave me I have given to them, and they have received them and have certainly come to know that I came out as your representative, and they have believed that you sent me forth.",
	"because I have given them the sayings that you gave me, and they have accepted them and have certainly come to know that I came as your representative, and they have believed that you sent me.",
	"because I have given them the sayings that you gave me, and they have accepted them and have certainly come to know that I came as your representative, and they have believed that you sent me.",
	"For I have given them the words that you gave me, and they have received them and have come to know in truth that I came from you; and they have believed that you sent me."
],[
	"I make request concerning them; I make request, not concerning the world, but con- cerning those you have given me; because they are yours,",
	"I make request concerning them; I make request, not concerning the world, but concerning those you have given me; because they are yours,",
	"I make request concerning them; I make request, not concerning the world, but concerning those whom you have given me, because they are yours;",
	"I make request concerning them; I make request, not concerning the world, but concerning those whom you have given me, because they are yours;",
	"I am praying for them. I am not praying for the world but for those whom you have given me, for they are yours."
],[
	"and all my things are yours and yours are mine, and I have been glorified among them.",
	"and all my things are yours and yours are mine, and I have been glorified among them.",
	"and all my things are yours and yours are mine, and I have been glorified among them.",
	"and all my things are yours and yours are mine, and I have been glorified among them.",
	"All mine are yours, and yours are mine, and I am glorified in them."
],[
	"Also, I am no longer in the world, but they are in the world and I am coming to you. Holy Fa- ther, watch over them on account of your own name which you have given me, in order that they may he one just as we are.",
	"Also, I am no longer in the world, but they are in the world and I am coming to you. Holy Father, watch over them on account of your own name which you have given me, in order that they may be one just as we are.",
	"I am no longer in the world, but they are in the world, and I am coming to you. Holy Father, watch over them on account of your own name, which you have given me, so that they may be one just as we are one.",
	"I am no longer in the world, but they are in the world, and I am coming to you. Holy Father, watch over them on account of your own name, which you have given me, so that they may be one just as we are one.",
	"And I am no longer in the world, but they are in the world, and I am coming to you. Holy Father, keep them in your name, which you have given me, that they may be one, even as we are one."
],[
	"When I was with them I used to watch over them on account of your own name which you have given me; and I have kept them, and not one of them is destroyed except the son of destruction, so that the scripture has been fulfilled.",
	"When I was with them I used to watch over them on account of your own name which you have given me; and I have kept them, and not one of them is destroyed except the son of destruction, in order that the scripture might be fulfilled.",
	"When I was with them, I used to watch over them on account of your own name, which you have given me; and I have protected them, and not one of them is destroyed except the son of destruction, so that the scripture might be fulfilled.",
	"When I was with them, I used to watch over them on account of your own name, which you have given me; and I have protected them, and not one of them is destroyed except the son of destruction, so that the scripture might be fulfilled.",
	"While I was with them, I kept them in your name, which you have given me. I have guarded them, and not one of them has been lost except the son of destruction, that the Scripture might be fulfilled."
],[
	"But now I am coming to you, and I am speaking these things in the world in order that they may have my joy in themselves to the full.",
	"But now I am coming to you, and I am speaking these things in the world in order that they may have my joy in themselves to the full.",
	"But now I am coming to you, and I am saying these things in the world, so that they may have my joy made complete in themselves.",
	"But now I am coming to you, and I am saying these things in the world, so that they may have my joy made complete in themselves.",
	"But now I am coming to you, and these things I speak in the world, that they may have my joy fulfilled in themselves."
],[
	"I have given your word to them, but the world has hated them, because they are no part of the world, just as I am no part of the world.",
	"I have given your word to them, but the world has hated them, because they are no part of the world, just as I am no part of the world.",
	"I have given your word to them, but the world has hated them, because they are no part of the world, just as I am no part of the world.",
	"I have given your word to them, but the world has hated them, because they are no part of the world, just as I am no part of the world.",
	"I have given them your word, and the world has hated them because they are not of the world, just as I am not of the world."
],[
	"I request you, not to take them out of the world, but to watch over them because of the wicked one.",
	"I request you, not to take them out of the world, but to watch over them because of the wicked one.",
	"I do not request that you take them out of the world, but that you watch over them because of the wicked one.",
	"I do not request that you take them out of the world, but that you watch over them because of the wicked one.",
	"I do not ask that you take them out of the world, but that you keep them from the evil one."
],[
	"They are no part of the world, just as I am no part of the world.",
	"They are no part of the world, just as I am no part of the world.",
	"They are no part of the world,l just as I am no part of the world.",
	"They are no part of the world, just as I am no part of the world.",
	"They are not of the world, just as I am not of the world."
],[
	"Sanctify them by means of the truth; your word is truth.",
	"Sanctify them by means of the truth; your word is truth.",
	"Sanctify them by means of the truth; your word is truth.",
	"Sanctify them by means of the truth; your word is truth.",
	"Sanctify them in the truth; your word is truth."
],[
	"Just as you sent me forth into the world, I also sent them forth into the world.",
	"Just as you sent me forth into the world, I also sent them forth into the world.",
	"Just as you sent me into the world, I also sent them into the world.",
	"Just as you sent me into the world, I also sent them into the world.",
	"As you sent me into the world, so I have sent them into the world."
],[
	"And I am sanctifying myself in their behalf, that they also may be sanctified by means of truth.",
	"And I am sanctifying myself in their behalf, that they also may be sanctified by means of truth.",
	"And I am sanctifying myself in their behalf, so that they also may be sanctified by means of truth.",
	"And I am sanctifying myself in their behalf, so that they also may be sanctified by means of truth.",
	"And for their sake I consecrate myself, that they also may be sanctified in truth."
],[
	"I make request, not concerning these only, but also concerning those putting faith in me through their word;",
	"I make request, not concerning these only, but also concerning those putting faith in me through their word;",
	"I make request, not concerning these only, but also concerning those putting faith in me through their word,",
	"I make request, not concerning these only, but also concerning those putting faith in me through their word,",
	"I do not ask for these only, but also for those who will believe in me through their word,"
],[
	"in order that they may all be one, just as you, Father, are in union with me and I am in union with you, that, they also may be in union with us, in order that the world may believe that you sent me forth.",
	"in order that they may all be one, just as you, Father, are in union with me and I am in union with you, that they also may be in union with us, in order that the world may believe that you sent me forth.",
	"so that they may all be one, just as you, Father, are in union with me and I am in union with you, that they also may be in union with us, so that the world may believe that you sent me.",
	"so that they may all be one, just as you, Father, are in union with me and I am in union with you, that they also may be in union with us, so that the world may believe that you sent me.",
	"that they may all be one, just as you, Father, are in me, and I in you, that they also may be in us, so that the world may believe that you have sent me."
],[
	"Also, I have given them the glory that you have given me, in order that they may be one just as we are one.",
	"Also, I have given them the glory that you have given me, in order that they may be one just as we are one.",
	"I have given them the glory that you have given me, in order that they may be one just as we are one.",
	"I have given them the glory that you have given me, in order that they may be one just as we are one.",
	"The glory that you have given me I have given to them, that they may be one even as we are one,"
],[
	"I in union with them and you in union with me, in order that they may be perfected into one, that the world may have the knowledge that you sent me forth and that you loved them just as you loved me.",
	"I in union with them and you in union with me, in order that they may be perfected into one, that the world may have the knowledge that you sent me forth and that you loved them just as you loved me.",
	"I in union with them and you in union with me, in order that they may be perfected into one, so that the world may know that you sent me and that you loved them just as you loved me.",
	"I in union with them and you in union with me, in order that they may be perfected into one, so that the world may know that you sent me and that you loved them just as you loved me.",
	"I in them and you in me, that they may become perfectly one, so that the world may know that you sent me and loved them even as you loved me."
],[
	"Father, as to what you have given me, I wish that, where I am, they also may be with me, in order to behold my glory that you have given me, because you loved me before the founding of the world.",
	"Father, as to what you have given me, I wish that, where I am, they also may be with me, in order to behold my glory that you have given me, because you loved me before the founding of the world.",
	"Father, I want those whom you have given me to be with me where I am, in order that they may look upon my glory that you have given me, because you loved me before the founding of the world.",
	"Father, I want those whom you have given me to be with me where I am, in order that they may look upon my glory that you have given me, because you loved me before the founding of the world.",
	"Father, I desire that they also, whom you have given me, may be with me where I am, to see my glory that you have given me because you loved me before the foundation of the world."
],[
	"Righteous Father, the world has, indeed, not come to know you; but I have come to know you, and these have come to know that you sent me forth.",
	"Righteous Father, the world has, indeed, not come to know you; but I have come to know you, and these have come to know that you sent me forth.",
	"Righteous Father, the world has, indeed, not come to know you, but I know you, and these have come to know that you sent me.",
	"Righteous Father, the world has, indeed, not come to know you, but I know you, and these have come to know that you sent me.",
	"O righteous Father, even though the world does not know you, I know you, and these know that you have sent me."
],[
	"And I have made your name known to them and Will make it known, in order that the love with which you leved me may be in them and I in union with them.",
	"And I have made your name known to them and will make it known, in order that the love with which you loved me may be in them and I in union with them.",
	"I have made your name known to them and will make it known, so that the love with which you loved me may be in them and I in union with them.",
	"I have made your name known to them and will make it known, so that the love with which you loved me may be in them and I in union with them.",
	"I made known to them your name, and I will continue to make it known, that the love with which you have loved me may be in them, and I in them."
]
];
