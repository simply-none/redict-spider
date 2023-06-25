let data = {
  "type": "element",
  "name": "s",
  "attributes": { "n": "4" },
  "elements": [
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "EX0",
        "hw": "there",
        "pos": "PRON"
      },
      "elements": [{ "type": "text", "text": "There " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "VM0",
        "hw": "will",
        "pos": "VERB"
      },
      "elements": [{ "type": "text", "text": "will " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "VBI",
        "hw": "be",
        "pos": "VERB"
      },
      "elements": [{ "type": "text", "text": "be " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AJ0",
        "hw": "ritual",
        "pos": "ADJ"
      },
      "elements": [{ "type": "text", "text": "ritual " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1",
        "hw": "rebellion",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "rebellion " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "PRP",
        "hw": "in",
        "pos": "PREP"
      },
      "elements": [{ "type": "text", "text": "in " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NP0",
        "hw": "brighton",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "Brighton " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "PRP",
        "hw": "from",
        "pos": "PREP"
      },
      "elements": [{ "type": "text", "text": "from " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AT0",
        "hw": "the",
        "pos": "ART"
      },
      "elements": [{ "type": "text", "text": "the " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1",
        "hw": "transport",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "Transport " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "CJC",
        "hw": "and",
        "pos": "CONJ"
      },
      "elements": [{ "type": "text", "text": "and " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AJ0",
        "hw": "general",
        "pos": "ADJ"
      },
      "elements": [{ "type": "text", "text": "General " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN2",
        "hw": "worker",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "Workers " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1-NP0",
        "hw": "union",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "Union " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "PRP",
        "hw": "over",
        "pos": "PREP"
      },
      "elements": [{ "type": "text", "text": "over " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1",
        "hw": "labour",
        "pos": "SUBST"
      },
      "elements": [{ "type": "text", "text": "Labour" }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "POS",
        "hw": "'s",
        "pos": "UNC"
      },
      "elements": [{ "type": "text", "text": "'s " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AJ0",
        "hw": "belated",
        "pos": "ADJ"
      },
      "elements": [{ "type": "text", "text": "belated " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1",
        "hw": "renunciation",
        "pos": "SUBST"
      },
      "elements": [
        { "type": "text", "text": "renunciation " }
      ]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "PRF",
        "hw": "of",
        "pos": "PREP"
      },
      "elements": [{ "type": "text", "text": "of " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AJ0",
        "hw": "unilateral",
        "pos": "ADJ"
      },
      "elements": [
        { "type": "text", "text": "unilateral " }
      ]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "AJ0",
        "hw": "nuclear",
        "pos": "ADJ"
      },
      "elements": [{ "type": "text", "text": "nuclear " }]
    },
    {
      "type": "element",
      "name": "w",
      "attributes": {
        "c5": "NN1",
        "hw": "disarmament",
        "pos": "SUBST"
      },
      "elements": [
        { "type": "text", "text": "disarmament" }
      ]
    },
    {
      "type": "element",
      "name": "c",
      "attributes": { "c5": "PUN" },
      "elements": [{ "type": "text", "text": "." }]
    }
  ]
}

let s = ''

s = data.elements.reduce((pre, cur) => {
  return pre + cur.elements[0].text
}, s)

console.log(data.elements.length, s)

