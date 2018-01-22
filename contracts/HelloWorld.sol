contract HelloWorld
{
	uint public balance;
	
	function HelloWorld()
	{
		balance = 1000;
	}

	function addMoney(uint amt) returns (uint newValue)
	{
		balance += amt;
		return balance;
	}

	function getBalance() returns (uint val)
	{
		return balance;
	}

}
