const cmosLogicDesign = {
  "slug": "cmos-logic-design",
  "title": "CMOS Logic Design",
  "summary": "Study CMOS inverter action, pull-up and pull-down networks, NAND/NOR logic, and static CMOS switching intuition.",
  "concepts": [
    "CMOS inverter",
    "Pull-up network",
    "Pull-down network",
    "NAND and NOR"
  ],
  "subtopics": [
    "Inverter switching",
    "PUN and PDN",
    "Static CMOS",
    "NAND/NOR operation"
  ],
  "formula": {
    "label": "CMOS idea",
    "expression": "PUN ON when output should be 1, PDN ON when output should be 0",
    "note": "Complementary networks explain most static CMOS gates."
  },
  "visualFocus": "input transition through pull-up and pull-down networks",
  "visualType": "cmos-logic",
  "subjectSlug": "vlsi-design",
  "editMeta": {
    "subject": "VLSI Design",
    "chapter": "CMOS Logic Design",
    "note": "Edit this file directly for this topic. Keep slug stable unless you also update routes/imports."
  }
};

export default cmosLogicDesign;
