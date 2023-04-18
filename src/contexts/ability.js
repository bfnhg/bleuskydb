import { AbilityBuilder, Ability } from "@casl/ability";

export function defineAbilitiesFor(roles, sections) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (roles.includes("super-admin")) {
    can("manage", "all");
  } else {
    sections.forEach((section) => {
      if (section.insert) can("create", section.label);
      if (section.read) can("read", section.label);
      if (section.update) can("update", section.label);
      if (section.delete) can("delete", section.label);
    });
  }

  return new Ability(rules);
}
