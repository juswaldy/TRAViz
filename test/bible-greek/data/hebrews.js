var fromPassage = "Hebrews";
var toPassage = "Hebrews";
var connectionType = "all";
var fontSizeMin = 23;

var bibleEditions = [
	"Hebrews",
	"LXX"	
];

var editionIds = [
	"Hebrews",
	"LXX"
];

var bibleVerses = [
[
"Heb1-5a υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε",
"Ps2-7 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε"
],[
"Heb1-5b ἐγὼ ἔσομαι αὐτῷ εἰς πατέρα καὶ αὐτὸς ἔσται μοι εἰς υἱόν",
"2Sam 7-14 ἐγὼ ἔσομαι αὐτῷ εἰς πατέρα καὶ αὐτὸς ἔσται μοι εἰς υἱόν"
],[
"Heb1-6 καὶ προσκυνησάτωσαν αὐτῷ πάντες ἄγγελοι θεοῦ",
"Deut32-43 καὶ προσκυνησάτωσαν αὐτῷ πάντες υἱοὶ θεοῦ"
],[
"Heb1-7 ὁ ποιῶν τοὺς ἀγγέλους αὐτοῦ πνεύματα καὶ τοὺς λειτουργοὺς αὐτοῦ πυρὸς φλόγα",
"Ps104(103)-4 ὁ ποιῶν τοὺς ἀγγέλους αὐτοῦ πνεύματα καὶ τοὺς λειτουργοὺς αὐτοῦ πῦρ φλέγον"
],[
"Heb1-8 ὁ θρόνος σου ὁ θεὸς εἰς τὸν αἰῶνα τοῦ αἰῶνος καὶ ἡ ῥάβδος τῆς εὐθύτητος ῥάβδος τῆς βασιλείας σου",
"Ps45-6 (44-7) ὁ θρόνος σου ὁ θεός εἰς τὸν αἰῶνα τοῦ αἰῶνος ῥάβδος εὐθύτητος ἡ ῥάβδος τῆς βασιλείας σου"
],[
"Heb1-9 ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν διὰ τοῦτο ἔχρισέν σε ὁ θεὸς ὁ θεός σου ἔλαιον ἀγαλλιάσεως παρὰ τοὺς μετόχους σου",
"Ps45-7 (44-8) ἠγάπησας δικαιοσύνην καὶ ἐμίσησας ἀνομίαν διὰ τοῦτο ἔχρισέν σε ὁ θεὸς ὁ θεός σου ἔλαιον ἀγαλλιάσεως παρὰ τοὺς μετόχους σου"
],[
"Heb1-10 σὺ κατ’ ἀρχάς κύριε τὴν γῆν ἐθεμελίωσας καὶ ἔργα τῶν χειρῶν σού εἰσιν οἱ οὐρανοί",
"Ps102-25 (101-26) κατ᾽ ἀρχὰς σύ κύριε τὴν γῆν ἐθεμελίωσας καὶ ἔργα τῶν χειρῶν σού εἰσιν οἱ οὐρανοί"
],[
"Heb1-11 αὐτοὶ ἀπολοῦνται σὺ δὲ διαμένεις καὶ πάντες ὡς ἱμάτιον παλαιωθήσονται",
"Ps102-26a (101-27a) αὐτοὶ ἀπολοῦνται σὺ δὲ διαμενεῖς καὶ πάντες ὡς ἱμάτιον παλαιωθήσονται"
],[
"Heb1-12 καὶ ὡσεὶ περιβόλαιον ἑλίξεις αὐτούς ὡς ἱμάτιον καὶ ἀλλαγήσονται σὺ δὲ ὁ αὐτὸς εἶ καὶ τὰ ἔτη σου οὐκ ἐκλείψουσιν",
"Ps102-26b-27 (101-27b-28) καὶ ὡσεὶ περιβόλαιον ἀλλάξεις αὐτούς καὶ ἀλλαγήσονται σὺ δὲ ὁ αὐτὸς εἶ καὶ τὰ ἔτη σου οὐκ ἐκλείψουσιν"
],[
"Heb1-13 κάθου ἐκ δεξιῶν μου ἕως ἂν θῶ τοὺς ἐχθρούς σου ὑποπόδιον τῶν ποδῶν σου",
"Ps110-1 (109-1) Κάθου ἐκ δεξιῶν μου ἕως ἂν θῶ τοὺς ἐχθρούς σου ὑποπόδιον τῶν ποδῶν σου"
],[
"Heb2-6 τί ἐστιν ἄνθρωπος ὅτι μιμνῄσκῃ αὐτοῦ ἢ υἱὸς ἀνθρώπου ὅτι ἐπισκέπτῃ αὐτόν",
"Psalm8-4 (8-5) τί ἐστιν ἄνθρωπος ὅτι μιμνῄσκῃ αὐτοῦ ἢ υἱὸς ἀνθρώπου ὅτι ἐπισκέπτῃ αὐτόν"
],[
"Heb2-7 ἠλάττωσας αὐτὸν βραχύ τι παρ’ ἀγγέλους δόξῃ καὶ τιμῇ ἐστεφάνωσας αὐτόν",
"Psalm8-5 (8-6) ἠλάττωσας αὐτὸν βραχύ τι παρ’ ἀγγέλους δόξῃ καὶ τιμῇ ἐστεφάνωσας αὐτόν"
],[
"Heb2-8 πάντα ὑπέταξας ὑποκάτω τῶν ποδῶν αὐτοῦ",
"Psalm8-6 (8-7) καὶ κατέστησας αὐτὸν ἐπὶ τὰ ἔργα τῶν χειρῶν σου πάντα ὑπέταξας ὑποκάτω τῶν ποδῶν αὐτοῦ"
],[
"Heb2-12 ἀπαγγελῶ τὸ ὄνομά σου τοῖς ἀδελφοῖς μου ἐν μέσῳ ἐκκλησίας ὑμνήσω σε",
"Ps22-22 (21-23) διηγήσομαι τὸ ὄνομά σου τοῖς ἀδελφοῖς μου ἐν μέσῳ ἐκκλησίας ὑμνήσω σε"
],[
"Heb2-13a ἐγὼ ἔσομαι πεποιθὼς ἐπ’ αὐτῷ",
"Isa8-17b πεποιθὼς ἔσομαι ἐπ’ αὐτῷ"
],[
"Heb2-13b ἰδοὺ ἐγὼ καὶ τὰ παιδία ἅ μοι ἔδωκεν ὁ θεός",
"Isa8-18 ἰδοὺ ἐγὼ καὶ τὰ παιδία ἅ μοι ἔδωκεν ὁ θεός"
],[
"Heb3-7b σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε",
"Ps95-7b (94-7b) σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε"
],[
"Heb3-8 μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ κατὰ τὴν ἡμέραν τοῦ πειρασμοῦ ἐν τῇ ἐρήμῳ",
"Ps95-8 (94-8) μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ κατὰ τὴν ἡμέραν τοῦ πειρασμοῦ ἐν τῇ ἐρήμῳ"
],[
"Heb3-9 οὗ ἐπείρασαν οἱ πατέρες ὑμῶν ἐν δοκιμασίᾳ καὶ εἶδον τὰ ἔργα μου",
"Ps95-9 (94-9) οὗ ἐπείρασαν οἱ πατέρες ὑμῶν ἐδοκίμασαν καὶ εἴδοσαν τὰ ἔργα μου"
],[
"Heb3-10 τεσσεράκοντα ἔτη διὸ προσώχθισα τῇ γενεᾷ ταύτῃ καὶ εἶπον ἀεὶ πλανῶνται τῇ καρδίᾳ αὐτοὶ δὲ οὐκ ἔγνωσαν τὰς ὁδούς μου",
"Ps95-10 (94-10) τεσσαράκοντα ἔτη προσώχθισα τῇ γενεᾷ ἐκείνῃ καὶ εἶπα ᾿Αεὶ πλανῶνται τῇ καρδίᾳ καὶ αὐτοὶ οὐκ ἔγνωσαν τὰς ὁδούς μου"
],[
"Heb3-11 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95-11 (94-11) ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb3-15 σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ",
"Ps95-7b-8 (94-7b-8) σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν ὡς ἐν τῷ παραπικρασμῷ"
],[
"Heb4-3 ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95-11 (94-11) ὡς ὤμοσα ἐν τῇ ὀργῇ μου εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb4-4 καὶ κατέπαυσεν ὁ θεὸς ἐν τῇ ἡμέρᾳ τῇ ἑβδόμῃ ἀπὸ πάντων τῶν ἔργων αὐτοῦ",
"Gen2-2 καὶ κατέπαυσεν τῇ ἡμέρᾳ τῇ ἑβδόμῃ ἀπὸ πάντων τῶν ἔργων αὐτοῦ"
],[
"Heb4-5 εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου",
"Ps95-11b (94-11b) εἰ εἰσελεύσονται εἰς τὴν κατάπαυσίν μου"
],[
"Heb4-7 σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν",
"Ps95-7b-8a (94-7b-8a) σήμερον ἐὰν τῆς φωνῆς αὐτοῦ ἀκούσητε μὴ σκληρύνητε τὰς καρδίας ὑμῶν"
],[
"Heb5-5 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε",
"Ps2-7 υἱός μου εἶ σύ ἐγὼ σήμερον γεγέννηκά σε"
],[
"Heb5-6 σὺ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισέδεκ",
"Ps110-4 (109-4) σὺ εἶ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισεδεκ"
],[
"Heb6-14 εἰ μὴν εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ σε",
"Gen22-17 ἦ μὴν εὐλογῶν εὐλογήσω σε καὶ πληθύνων πληθυνῶ τὸ σπέρμα σου"
],[
"Heb7-17 σὺ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισέδεκ",
"Ps110-4 (109-4) σὺ εἶ ἱερεὺς εἰς τὸν αἰῶνα κατὰ τὴν τάξιν Μελχισεδεκ"
]
];
