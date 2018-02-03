const expect = require('expect');

//import
const {isRealString} = require('./validation');

describe('isRealString',()=> {
    
    it('should reject non-string values',()=>{
          var res = isRealString(98);
          expect(res).toBe(false);
    });
    
    it('should reject string with only white spaces',()=>{
        var res = isRealString('  ');
        expect(res).toBe(false);
    });

  it('should allow string with non space characters',()=>{
    var res = isRealString('Naren  ');
    expect(res).toBe(true);
   });

});