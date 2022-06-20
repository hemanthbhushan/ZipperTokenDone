const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Test for ZipperToken", function () {
    let ZipperToken;
    let zipperToken;
    let owner;
    let addr1;
    let addr2;


    beforeEach(async ()=>{
        ZipperToken = await ethers.getContractFactory("ZipperToken");
        zipperToken = await ZipperToken.deploy();
        [owner,addr1,addr2] = await ethers.getSigners();
        await zipperToken.deployed();
    });
    describe("testing functions",()=>{
        it("testing balanceOf",async ()=>{
           const balance = await zipperToken.balanceOf(owner.address);
           const totalsupply = await zipperToken.totalSupply();
           expect( balance).to.be.equal(totalsupply);

        });
        it("name,symbol,totalsupply",async ()=>{
            const name = await zipperToken.name();
            const symbol = await zipperToken.symbol();
            expect(name).to.be.equal("ZipperToken");
            expect(symbol).to.be.equal("ZIP");

        });
        it("testing transfer",async ()=>{
            const Transfer1 = await zipperToken.transfer(addr1.address,100);
            const addr1Balance = await zipperToken.balanceOf(addr1.address);
            expect(addr1Balance).to.be.equal(100);

            await zipperToken.connect(addr1).transfer(addr2.address,50);
            
            const add2Balance = await zipperToken.balanceOf(addr2.address);
            // expect(addr1Balance).to.be.equal(100);
            expect(add2Balance).to.be.equal(50);
            


            //  expect(Transfer1).to.be.equal(true);

        });
        it("testing transferFrom",async ()=>{
            
            const transferFrom = await zipperToken.transferFrom(owner.address,addr2.address,20);
            const balance1=await zipperToken.balanceOf(addr2.address);
            expect(balance1).to.be.equal(20);
        //    expect(transferFrom).to.be.equal(true);
        });
        
        it("approve",async ()=>{
            const approve = await zipperToken.approve(addr1.address,20);
            const allowance1 = await zipperToken.allowance(owner.address,addr1.address);
            expect(allowance1).to.equal(20);
        });
         

        
    });
    


});
