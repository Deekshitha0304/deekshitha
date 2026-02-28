interface PricingPolicy {
  getDiscount(): number;
}


class RegularPricing implements PricingPolicy {
  getDiscount() {
    return 0;
  }
}

class PremiumPricing implements PricingPolicy {
  getDiscount() {
    return 0.2;
  }
}

type User = {
  name: string;
  pricing: PricingPolicy;
};

const regularUser: User = {
  name: "Alice",
  pricing: new RegularPricing()
};

const premiumUser: User = {
  name: "Bob",
  pricing: new PremiumPricing()
};

console.log(premiumUser.pricing.getDiscount()); 