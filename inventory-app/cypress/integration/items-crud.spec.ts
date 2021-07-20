describe('ItemsCrud', () => {
  it('Adding an item', () => {
    cy.visit('/')
    const times = (x: number) => (f: () => void) => {
      if (x > 0) {
        f()
        times(x - 1)(f)
      }
    }
    const addItem = (amount?: number) => {
      cy.get('#add-button').click()
      const items = ["apple", "bag", "balloon", "bananas", "bed", "beef", "blouse", "book", "bookmark", "boom box", "bottle", "bottle cap", "bow", "bowl", "box", "bracelet", "bread", "brocolli", "hair brush", "buckel", "button", "camera", "candle", "candy wrapper", "canvas", "car", "greeting card", "playing card", "carrots", "cat", "CD", "cell phone", "packing peanuts", "cinder block", "chair", "chalk", "newspaper", "soy sauce packet", "chapter book", "checkbook", "chocolate", "clay pot", "clock", "clothes", "computer", "conditioner", "cookie jar", "cork", "couch", "credit card", "cup", "deodorant ", "desk", "door", "drawer", "drill press", "eraser", "eye liner", "face wash", "fake flowers", "flag", "floor", "flowers", "food", "fork", "fridge", "glass", "glasses", "glow stick", "grid paper", "hair tie", "hanger", "helmet", "house", "ipod", "charger", "key chain", "keyboard", "keys", "knife", "lace", "lamp", "lamp shade", "leg warmers", "lip gloss", "lotion", "milk", "mirror", "model car", "money", "monitor", "mop", "mouse pad", "mp3 player", "nail clippers", "nail file", "needle", "outlet", "paint brush", "pants", "paper", "pen", "pencil", "perfume", "phone", "photo album", "picture frame", "pillow", "plastic fork", "plate", "pool stick", "soda can", "puddle", "purse", "blanket", "radio", "remote", "ring", "rubber band", "rubber duck", "rug", "rusty nail", "sailboat", "sand paper", "sandal", "scotch tape", "screw", "seat belt", "shampoo", "sharpie", "shawl", "shirt", "shoe lace", "shoes", "shovel", "sidewalk", "sketch pad", "slipper", "soap", "socks", "sofa", "speakers", "sponge", "spoon", "spring", "sticky note", "stockings", "stop sign", "street lights", "sun glasses", "table", "teddies", "television", "thermometer", "thread", "tire swing", "tissue box", "toe ring", "toilet", "tomato", "tooth picks", "toothbrush", "toothpaste", "towel", "tree", "truck", "tv", "twezzers", "twister", "vase", "video games", "wallet", "washing machine", "watch", "water bottle", "doll", "magnet", "wagon", "headphones", "clamp", "USB drive", "air freshener", "piano", "ice cube tray", "white out", "window", "controller", "coasters", "thermostat", "zipper"];
      const item = items[Math.floor(Math.random() * items.length)];
      cy.get('#itemName').click().type(item)
      const itemAmount: number = amount != null ? amount : Math.floor(Math.random() * 50);
      cy.get('#itemAmount').click().clear().type(itemAmount.toString())
      cy.get('#addItem').click()
      cy.contains(item.length<8? item : item.substring(0, 6))
    }
    let i = 0;
    times(3)(() => {
      addItem(i++)
    })
    expect(cy.get(':nth-child(2) > .cdk-column-status > .mat-icon').contains("warning"))
    expect(cy.get(':nth-child(2) > .cdk-column-amount > .mat-warn').should('be.disabled'))
    cy.get(':nth-child(2) > .cdk-column-amount > .mat-primary > .mat-button-wrapper > .mat-icon').click()
    expect(cy.get(':nth-child(2) > .cdk-column-status > .mat-icon').contains("check_box"))
    cy.get(':nth-child(2) > .cdk-column-info > #info-button').click()
    cy.get('[data-test-id="createdDate"]', {
      timeout: 15000
    }).invoke('text').then((text) => {
      expect(text.length).to.be.at.least(1)
    });
    cy.get('[data-test-id="lastUpdatedDate"]', {
      timeout: 15000
    }).invoke('text').then((text) => {
      expect(text.length).to.be.at.least(1)
    });
    cy.get('#mat-dialog-3').type('{esc}');
    cy.get(':nth-child(3) > .cdk-column-delete > #remove-button').click()
    cy.get(':nth-child(3) > .cdk-column-delete > #remove-button').click()
    cy.get('#remove-button').click()
    expect(cy.contains('Empty inventory'))
    cy.get('.mat-toolbar > :nth-child(4)').click()
    cy.get('.mat-simple-snackbar-action > .mat-focus-indicator > .mat-button-wrapper').contains('Angelo Lamonaca')

  });
});
