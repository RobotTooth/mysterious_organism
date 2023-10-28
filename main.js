// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let mutationIndex;
      do {
        mutationIndex = Math.floor(Math.random() * 15);
      } while (
        this.dna[mutationIndex] === (this.dna[mutationIndex] = returnRandBase())
      );
      return this.dna;
    },
    compareDNA(specimen) {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === specimen.dna[i]) {
          count++;
        }
      }
      return `specimen${this.specimenNum} and specimen${specimen.specimenNum} have ${((count/this.dna.length)*100).toFixed(2)}% DNA in common`;
    },
    willLikelySurvive() {
      let count = 0;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna === 'G') {
          count++;
        }
      }
      let survivalChance = (count/this.dna.length)*100;
      return survivalChance >= 60 ? true : false;
    },
  };
};

const mutantGenerator = () => {
  let survivers = [];
  do {
    const randomSpecimen = Math.floor(Math.random()*1000);
    let mutant = pAequorFactory(randomSpecimen, mockUpStrand());
    if(mutant.willLikelySurvive()) {
      survivers.push(mutant);
    }
  } while (survivers.length < 31);
  return survivers;
};



const mutant1 = pAequorFactory(1, mockUpStrand());
const mutant2 = pAequorFactory(2, mockUpStrand());
console.log(mutant1.dna);
console.log(mutant2.dna);
console.log(mutant1.compareDNA(mutant2));
console.log(mutant1.willLikelySurvive());
console.log(mutantGenerator());




