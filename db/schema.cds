namespace golf;

entity Rounds {
  key ID    : UUID;
  title     : String(111);
  createdAt : Timestamp   @cds.on.insert: $now;
  createdBy : String(20)  @cds.on.insert: $user;
  modifiedAt : Timestamp  @cds.on.insert: $now  @cds.on.update: $now;
  modifiedBy : String(20) @cds.on.insert: $user @cds.on.update: $user;
  holes : Composition of many Holes;
};

entity Holes {
  key ID     : UUID;
  score      : Integer;
  par        : Integer enum {
    Three = 3;
    Four = 4;
    Five = 5;
  };
  result     : String; 
  shots : Composition of many Shots;
  rounds: Association to Rounds;
};

entity Shots {
  key ID     : UUID;
  shotNumber : Integer;
  holes: Association to Holes;
};