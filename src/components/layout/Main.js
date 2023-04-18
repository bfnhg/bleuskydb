import { useState, useEffect, useContext } from "react";
import React from "react";

import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import { Button, Result } from "antd";

import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { CompanyContext } from "../../contexts/CompanyContext";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const { Lang, setLang, Company, setCompany } = useContext(CompanyContext);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          // ACcess Control page :
          AccessControl: "Access Control",
          ManageSections: "Manage Sections",
          ManageAccess: "Manage Access",
          ManageTeam: "Manage Team",
          ManageRoles: "Manage Roles",
          ManageTitles: "Manage Titles",
          ManageAccounts: "Manage Accounts",
          AddNewAccount: "Add New Account",
          CreateAccount: "Create Account",
          AddNewRole: "Add New Role",
          SelectRole: "Select Role",
          ChooseRoleToManageAccess: "Choose Role To Manage Access",
          RoleAlreadyExists: "Role Already Exists !",
          RoleCreatedSuccessfully: "Role Created Successfully !",
          ErrorUpdatingRole: "Error Updating Role !",
          AddNewMnager: "Add New Mnager",
          CreateRole: "Create Role",
          PleaseEnterRoleName: "Please Enter Role Name",
          RoleNames: "Role Names",
          PhoneNumber: "Phone Number",
          PleaseEnterTheEmail: "Please Enter The Email",
          ChangePassword: "Change Password",
          UpdateAccount: "Update Account",
          AccountDetails: "Account Details",
          LastLogin: "Last Login",
          CurrentPassword: "Current Password",
          NewPassword: "New Password",
          AddRoleToAccount: "Add Role To Account",
          RemoveRoleFromAccount: "Remove Role From Account",
          NA: "N/A",
          PleaseEnterThePhoneNumber: "Please Enter The Phone Number",
          PleaseSelectAManager: "Please Select A Manager",
          PleaseEnterThePassword: "Please Enter The Password",
          PleaseSelectAtLeastOneRole: "Please Select At Least One Role",
          RoleName: "Role Name",
          EditRole: "Edit Role",
          SaveRole: "Save Role",
          CancelEdit: "Cancel Edit",
          RoleUpdatedSuccessfully: "Role Updated Successfully !",
          AddNewSection: "Add New Section",
          AddSection: "Add Section",
          AddSubsection: "Add Subsection",
          AddSubsectionTo: "Add Subsection To",
          CancelSubsection: "Cancel Subsection",
          SubsectionName: "Subsection Name",
          ConfirmDeleteSection: "Confirm Delete Section",
          NoSubSections: "No sub-sections available for this section",
          NotYetAuthenticated: "Not Yet Authenticated",
          NoCancel: "No, cancel",
          YesDelete: "Yes, delete it",
          DeleteThisSection:
            "Are you sure you want to delete this section and all associate SubSections ?",
          EditSection: "Edit Section",
          DeleteSection: "Delete Section",
          SectionName: "Section Name",
          ParentSection: "Parent Section",
          SubsectionCreatedSuccess: "Subsection Created Successfully !",
          FailedCreateSubsection: "Failed To Create Subsection !",
          SubsectionUpdatedSuccess: "Subsection Updated Successfully !",
          PleaseEnterTheSectionName: "Please Enter The Section Name",
          SectionAlreadyExists: "Section Already Exists !",
          SectionCreatedSuccessfully: "Section Created Successfully !",
          SectionUpdatedSuccessfully: "Section Updated Successfully !",
          SectionDeletedSuccessfully: "Section Deleted Successfully !",
          FailedCreateSection: "Failed To Create Section !",
          SectionAndAssociatedSubsectionsDeletedSuccessfully:
            "Section And Associated Subsections are Deleted Successfully !",
          FailedDeleteSectionAndAssociatedSubsections:
            "Failed To Delete Section And Associated Subsections !",
          SaveAccess: "Save Access",
          AccessSavedSuccessfully: "Access Saved Successfully !",
          ErrorSavingAccess: "Error Saving Access !",
          SelectParentSection: "Select Parent Section",
          FilterWithParentSection: "Filter With Parent Section",

          //update page
          UpdateCompany: "Update Company",
          textupdate:
            "Please fill out the required fields below and click on the Save button to update your company's informations",
          generalinf: "General information",
          companyname: "Company name",
          address: "Address",
          country: "Country",
          province: "Province",
          city: "City",
          postalcode: "Postal code",
          foundingdate: "Founding date",
          Yearenddate: "Year-end date",
          loadingcompanyinformation: "Loading company information..",
          Loadingfinished: "Loading finished",
          dashboard: "Dashboard",
          sales: "Sales",
          Orderdeletedsuccessfully: "Order deleted successfully",
          Opportunitydeletedsuccessfully: "Opportunity deleted successfully",
          OrdercostdetailsupdatedSuccessfully:
            "Order cost details updated Successfully",
          OpportunityrevenuedetailsupdatedSuccessfully:
            "Opportunity revenue details updated Successfully",
          OrderupdatedSuccessfully: "Order updated Successfully",
          OpportunityupdatedSuccessfully: "Opportunity updated Successfully",

          //
          // general informations
          companyname: "Company name",
          logout: "Sign out",
          company: "Add Company",
          select: "Select and Access Company Information:",
          Targetcustomers: "Target customers",
          Market: "Market",
          Themaincustomers: "Customers",
          Revenuemodel: "Revenue models",
          Businesspartners: "Business partners",
          Businessnumber: "Business number",
          Typeofindustry: "Type of industry",
          Postalcode: "Postal code",
          Foundingdate: "Founding date",
          Yearenddate: "Year-end date",
          Estimatedannualtaxrate: "Estimated annual tax rate (%)",
          Numberofemployees: "Number of employees",
          editcompany: "Edit informations",
          deletecompany: "Delete company",
          deletecompanytext: "Are you sure you want to delete",
          yes: "Yes",
          no: "No",
          addedsuccessfully: "values ​​added successfully!",
          Suretodelete: "Sure to delete?",
          Numberofemployees: "Number of employees",
          editcompany: "Edit informations",
          PleaseInputTheBusinessNumber: "Please Input The Business Number",
          deletecompany: "Delete company",
          Pleaseinputthe: "Please input the name of",
          deletecompanytext: "Are you sure you want to delete",
          yes: "Yes",
          no: "No",
          addnewholder: "Add new holder",
          addedsuccessfully: "values ​​added successfully!",
          Suretodelete: "Sure to delete?",
          pleaseinputthefoundingdate: "Please input the founding date",
          pleaseinputthecity: "Please input the city",
          valuesaddedSuccessfully: "Values added Successfully",

          //order book
          orderbook: "Order book",
          orderbookdeleted: "Order book deleted successfully!",
          orderbookcreation: "Order book added Successfully!",
          orderbookupdate: "Order book updated Successfully!",
          deleterow: "Are you sure you want to delete this row?",
          orderbooknamerequired: "Please input a name for the orderbook!",
          creationdate: "Creation date",
          selectcustomer: "Select a customer",
          selectproduct: "Select a product",
          YearsInterval: "Years Interval",
          valuecannotbelessthan0: "value cannot be less than 0",
          PleaseInputTheYearsInterval: "Please Input The Years Interval",
          addnewmanager: "Add new manager",
          Pleaseenteradate: "Please enter a date",
          //opportunity book
          opportunitybook: "Opportunity Book",
          opportunitybookdeleted: "Opportunity Bookdeleted successfully!",
          opportunitybookcreation: "Opportunity Book added Successfully!",
          opportunitybookupdate: "Opportunity Book updated Successfully!",
          opportunitybooknamerequired:
            "Please input a name for the opportunity Book!",
          ReturntoGeneralInformations: "Return to General Informations",

          //
          //ADD company
          //informations générales
          Addanothercompany: "Add another company",

          AddCompany: "Add Company",
          textButtonAJT:
            "Please fill out the required fields below and click on the Submit button to add your company's informations",
          generalInformation: "General information",
          Pleaseinputthecompanyname: "Please input the company name!",
          ProvinceSelect: "Select the province",
          selectthetypeofindustry: "Select the type of industry",
          selectthebudget: "Select the budget",
          selectdate: "Select date",
          pleaseenteranumberbetween0and100:
            "Please enter a number between 0 and 100",
          pleaseselectthestrategictarget: "Please select the strategic target",
          Pleaseinputthetypeofstrategictarget:
            "Please input the type of strategic target",
          PleaseinputtheShareHolders: "Please input the Share Holders",

          SelectStartPeriod: "Select Start Period",
          Pleaseinputthemanagertitle: "Please input the manager title",
          selecttheproductsservices: "Select the products services",
          Pleaseinputthemanagerfirstname: "Please input the manager firstname",
          Pleaseinputthemanagerlastname: "Please input the manager lastname",
          type: "type",
          YourCompanyhasbeenaddedsuccessfully:
            "Your Company has been added successfully",
          TheCompanyhasbeenupdatedsuccessfully:
            "The Company has been updated successfully",
          Selectacompanytodisplayitsdata:
            "Select a company to display its data",
          Pleaseentercustomername: "Please enter custome rname",
          Companydeleted: "Company deleted successfully!",

          //
          //Targetcustomer
          selectthemarket: "Select the market",
          addtitles: "Add titles",

          MainCustomers: "Customer",
          selectthemaincustomers: "Select the customers",
          RevenueModel: "Revenue Model",
          AddnewmarketButton: "Add new market",
          AddnewcustomerButton: " Add new customers",

          RevenueModelButton: "Add new revenue model",
          selecttherevenuemodel: "Select the revenue model",
          BusinesspartnersButton: "Business partners",
          typeofactivities: " type of activities",
          selectthebusinesspartners: "Select the business partners",
          Addnewbusinesspartner: "Add new business partner",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts:
            "Description of services and products",
          Descriptionofoffer: "Description of the offer",
          strategicplanning: "Strategic planning",
          selectthestrategictarget: "Select the strategic target",
          selectthetypeofactivities: "Select the type of activities",
          Descriptionplaceholder: "Please write a description",
          Descriptionplace: " write a description",
          BookTotal: "Book Total",

          writeacostumer: "Please write a customer",
          writeaproduct: "Please write a  product",
          Descriptionofoffer: "Description of the offer",
          strategicplanning: "Strategic planning",
          Strategictargets: "Strategic targets",
          CreateanewStrategictargets: " Create a new Strategic targets",
          selectthestrategictarget: "Select the strategic target",
          selectthetypeofactivities: "Select the type of activities",
          Typeofactivities: "Type of activities",
          ProductsServices: "Products/Services",
          StrategictargetsButton: " Add new strategic targets",
          TypeofactivitiesButton: " Add new type of activities",
          ProductsServicesButton: " Add new products / services",
          Startyear: "Start year",
          StartPeriod: "Start Period",
          Selectdate: "Select date",
          Selectmonth: "Select Month",
          Selectyear: "Select year",
          //Management team
          Managementteam: " Management team",
          Createanewmanager: "Create a new manager",
          Leadersname: "Leader's name",

          addtolist: "Add to list",
          pleaseselectthebusinesspartner: "Please select the business partner",

          Lastname: "Leader's name",
          Firstname: "First name",
          Titles: "Titles",
          Title: "Title",
          Yearsofexperience: "Years of experience",
          cancel: "Cancel",
          create: "Create",
          Delete: "Delete",
          edit: "Edit",
          save: "Save",
          details: "Details",
          pleaseselectthebudget: "Please select the budget",
          CitySelect: "Please select a city",
          pleaseselecttheproductservice: "Please select the product / service",

          Managetitles: "",
          Createanewtitle: " Create a new title",
          Addtitle: "Add title",
          EditTitles: "Edit Titles",
          Label: "Label",
          Titlelabel: "Title label",
          selectleader: "Select a leader",
          selectShareHolders: "Select a shareholders",
          Selectsharepourcent: "Select percentage",
          Managetitles: "Manage titles",
          Addmanager: "Add manager",

          // Legal structure
          Legalstructure: "Legal structure",
          ShareHolders: "ShareHolders",
          CreateanewShareholder: "Add the Shareholder",
          Nameshareholders: "Name of shareholders",
          Shares: "Shares",
          percentshares: "% of shares",
          Startdate: "Start date",
          Addshareholders: "shareholders",
          submit: "Submit company",
          UpdateCompany: "Update Company",
          textupdate:
            "Please fill out the required fields below and click on the Save button to update your company's informations",
          generalinf: "General information",
          companyname: "Company name",
          address: "Address",
          country: "Country",
          province: "Province",
          city: "City",
          postalcode: "Postal code",
          foundingdate: "Founding date",
          Yearenddate: "Year-end date",
          loadingcompanyinformation: "Loading company information..",
          Loadingfinished: "Loading finished",
          dashboard: "Dashboard",
          sales: "Sales",
          //
          // general informations
          companyname: "Company name",
          logout: "Sign out",
          company: "Add Company",
          select: "Select and Access Company Information:",
          Targetcustomers: "Target customers",
          Market: "Market",
          Themaincustomers: "Customers",
          Revenuemodel: "Revenue models",
          Businesspartners: "Business partners",
          Businessnumber: "Business number",
          Typeofindustry: "Type of industry",
          Postalcode: "Postal code",
          Foundingdate: "Founding date",
          Yearenddate: "Year-end date",
          Estimatedannualtaxrate: "Estimated annual tax rate (%)",
          Numberofemployees: "Number of employees",
          editcompany: "Edit informations",
          deletecompany: "Delete company",
          deletecompanytext: "Are you sure you want to delete",
          yes: "Yes",
          no: "No",
          addedsuccessfully: "values ​​added successfully!",
          //order book
          orderbook: "Order book",
          orderbookdeleted: "Order book deleted successfully!",
          orderbookcreation: "Order book added Successfully!",
          orderbookupdate: "Order book updated Successfully!",
          deleterow: "Are you sure you want to delete this row?",
          orderbooknamerequired: "Please input a name for the orderbook!",
          creationdate: "Creation date",
          //opportunity book
          opportunities: "Opportunities",

          opportunitybook: "Opportunity Book",
          opportunitybookdeleted: "Opportunity Bookdeleted successfully!",
          opportunitybookcreation: "Opportunity Book added Successfully!",
          opportunitybookupdate: "Opportunity Book updated Successfully!",
          opportunitybooknamerequired:
            "Please input a name for the opportunity Book!",
          IndustryTypes: "IndustryTypes",
          pleaseselectthestrategictarget: "Please select the strategic target",

          //
          //ADD company
          //informations générales
          pleaseselectthemarket: "Please select the market",

          AddCompany: "Add Company",
          textButtonAJT:
            "Please fill out the required fields below and click on the Submit button to add your company's informations",
          generalInformation: "General information",
          Pleaseinputthecompanyname: "Please input the company name!",
          ProvinceSelect: "Select the province",
          selectthetypeofindustry: "Select the type of industry",
          AddnewtypeIndustry: " Add new type of industry",
          selectthebudget: "Select the budget",
          //
          //Targetcustomer
          selectthemarket: "Select the market",
          market: "market",

          MainCustomers: "Customer",
          selectthemaincustomers: "Select the customers",
          RevenueModel: "Revenue Model",
          AddnewmarketButton: "Add new market",
          AddnewcustomerButton: " Add new customers",
          RevenueModelButton: "Add new revenue model",
          selecttherevenuemodel: "Select the revenue model",
          BusinesspartnersButton: "Business partners",
          selectthebusinesspartners: "Select the business partners",
          Addnewbusinesspartner: "Add new business partner",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts:
            "Description of services and products",
          Descriptionofoffer: "Description of the offer",
          strategicplanning: "Strategic planning",
          Strategictargets: " Strategic targets",
          selectthestrategictarget: "Select the strategic target",
          selectthetypeofactivities: "Select the type of activities",
          Typeofactivities: "Type of activities",
          ProductsServices: "Products/Services",
          StrategictargetsButton: " Add new Strategic targets",
          TypeofactivitiesButton: " Add new Type of activities",
          ProductsServicesButton: " Add new Products/Services",

          //Management team
          Managementteam: " Management team",
          Createanewmanager: "Create a new manager",
          Leadersname: "Leader's name",

          Lastname: "Leader's name",
          Firstname: "First name",
          Titles: "Titles",
          Title: "Title",
          Yearsofexperience: "Years of experience",
          cancel: "Cancel",
          create: "Create",
          Delete: "Delete",
          edit: "Edit",
          save: "Save",
          details: "Details",

          Managetitles: "",
          Createanewtitle: " Create a new title",
          Addtitle: "Add title",
          EditTitles: "Edit Titles",
          Label: "Label",
          Titlelabel: "Title label",
          selectleader: "Select a leader",
          Managetitles: "Manage titles",
          Addmanager: "Add manager",

          // Legal structure
          Legalstructure: "Legal structure",
          ShareHolders: "ShareHolders",
          CreateanewShareholder: "Add the Shareholder",
          addtolist: "Add to list",
          Name: "Name",
          addtitles: "Add new title",

          Nameshareholders: "Name of shareholders",
          Shares: "Shares",
          percentshares: "% of shares",
          Startdate: "Start date",
          Addshareholders: "shareholders",
          submit: "Submit company",
          PleaseInputTheStartYear: "Please Input The Start Year",
          PleaseInputTheStartPeriod: "Please Input The Start Period",
          pleaseselecttherevenuemodel: "Please select the revenue model",
          Pleaseinputthedetailseofstrategictarget:
            "Please input the detaile of strategic target",
          Pleaseselectacustomer: "Please select a customer",
          pleaseinputtheaddress: "Please input the address",
          pleaseinputthepostalcode: "Please input the postal code",
          pleaseinputthestartdate: "Please input the start date",
          Pleaseenterproductlabel: "Please enter product label",

          Selectopportunitystatus: "Select opportunity status",
          Open: "Open",
          Waiting: "Waiting",
          Suspended: "Suspended",
          Lost: "Lost",
          //Commands order books
          Customer: "Customer",
          Product: "Product",
          Startdatee: "Start date",
          Enddate: "End date",
          Priceperday: "Price per day",
          Description: "Description",
          Createanewopportunity: "Create a new opportunity",

          SearchtoSelect: "Search to select",
          selectmanagerstitles: "Select manager's titles",
          pleaseselectthecustomer: "Please select the customer",
          writeaproductplaceholder: "Write a product ",

          //orderBooks Details
          Commands: "Orders",
          RevenueDetails: "Revenue details",
          January: "January",
          pleaseselectthetypeofindustry: "Please select the type of industry",
          pleaseselectthecountry: "Please select company's country",
          February: "February",
          March: "March",
          April: "April",
          May: "May",
          June: "June",
          July: "July",
          August: "August",
          September: "September",
          October: "October",
          November: "November",
          December: "December",
          Action: "Action",
          CreateCustomer: "Create customer",
          CreateProduct: " Create product",
          Createbook: "Create Order",
          Createopportunity: "Create Opportunity",
          RevenueSummary: "Revenue summary",
          Createaneworder: "Create a new order",
          Customersname: "Customer's name",
          Productslabel: "Product's label",
          CreateanewProduct: "Create a new product",
          addnewmanager: "Add new manager",
          addnewholder: "Add new shareholder",
          nameproduct: "product name",
          pleaseselecttheactivitytype: "Please select the activity type",

          CreateanewCustomer: "Create a new customer",
          Pleaseselectastatus: "Please select a status",

          //Strategic Plan
          titlePage: "Strategic planning follow-up",
          title: "Create a new stratigic target",
          statut: "Status",
          Progression: "Progress",
          Departement: "Department",
          selectdatefin: "Select end Date",
          selectdatedebut: "Select start Date",
          Pleaseselectaproduct: "Please select a product",

          // Gestion des Prets
          Loansmanagement: "Loans management",
          Create: "Create",
          Loanname: "Loan name",
          Creationdate: "Creation date",
          Operation: "Operation",
          Delete: "Delete",
          Details: "Details",
          //Create Pret
          Addaloan: "Add a loan ",
          Creditor: "Creditor",
          Loanamount: "Loan amount",
          Terms: "Terms",
          Loandate: "Loan date",
          Capitalfreeperiod: "Capital-free period",
          Interestrates: "Interest rates",
          Particularconditions: "Particular conditions",
          writeacostumerplaceholder: "Write a costumer ",

          chooseaterm: "Choose a term",
          sixtymonths: " sixty months",
          thirtymonths: " thirty months",
          ninetymonths: "ninety months",
          //EDITE PRET
          EditePret: "Edit a Loan",
          Edit: "Edit",
          Cancel: "Cancel",

          //Getion des Marges
          Addamargin: "Add a margin",
          Marginsmanagement: "Margins management ",
          Institutionname: "Institution name",
          //Creation d une marge
          Authorizedamount: "Authorized amount",
          //EditeMarge
          EditerlaMarge: "Edit a Margin",
          home: "Home",
          add12months: "eng",
          duplicatelastorderbook: "Duplicate last order book",
          duplicatelastopportunitybook: "Duplicate the last opportunity book",
          Gained: "Gained",
        },
      },
      fr: {
        translation: {
          // Control panel
          AccessControl: "Contrôle d'accès",
          ManageSections: "Gérer les sections",
          ManageAccess: "Gérer l'accès",
          ManageTeam: "Gérer l'équipe",
          ManageRoles: "Gérer les rôles",
          ManageTitles: "Gérer les titres",
          ManageAccounts: "Gérer les comptes",
          AddNewAccount: "Ajouter un nouveau compte",
          CreateAccount: "Créer un compte",
          AddNewRole: "Ajouter Nouveau Rôle",
          SelectRole: "Sélectionner un Rôle",
          ChooseRoleToManageAccess: "Choisir un Rôle pour gérer l'accès",
          RoleAlreadyExists: "Le Rôle existe déjà !",
          RoleCreatedSuccessfully: "Le Rôle a été créé avec succès !",
          ErrorUpdatingRole: "Erreur lors de la mise à jour du Rôle !",
          AddNewMnager: "Ajouter un nouveau gestionnaire",
          CreateRole: "Créer un Rôle",
          PleaseEnterRoleName: "Veuillez entrer le nom du Rôle",
          RoleNames: "Noms de Rôle",
          FilterWithParentSection: "Filtrer avec la Section Parent",
          PhoneNumber: "Numéro de téléphone",
          PleaseEnterTheEmail: "Veuillez entrer l'email",
          ChangePassword: "Changer Mot de Passe",
          UpdateAccount: "Mettre à jour le compte",
          AccountDetails: "Détails du compte",
          Update: "Mise à jour",
          LastLogin: "Dernière connexion",
          CurrentPassword: "Mot de passe actuel",
          NewPassword: "Nouveau mot de passe",
          AddRoleToAccount: "Ajouter un Rôle au compte",
          RemoveRoleFromAccount: "Supprimer le Rôle du compte",
          NA: "N/A",
          PleaseEnterThePhoneNumber: "Veuillez entrer le numéro de téléphone",
          PleaseSelectAManager: "Veuillez sélectionner un Manager",
          PleaseEnterThePassword: "Veuillez entrer le mot de passe",
          PleaseSelectAtLeastOneRole: "Veuillez sélectionner au moins un Rôle",
          RoleName: "Nom du Rôle",
          EditRole: "Modifier le Rôle",
          SaveRole: "Enregistrer le Rôle",
          CancelEdit: "Annuler la Modification",
          RoleUpdatedSuccessfully: "Le Rôle a été mis à jour avec succès !",
          AddNewSection: "Ajouter Nouvelle Section",
          AddSection: "Ajouter une Section",
          SectionName: "Nom de la Section",
          ParentSection: "Section Parent",
          Subsections: "Sous-Sections",
          AddSubsection: "Ajouter une Sous-Section",
          AddSubsectionTo: "Ajouter une Sous-Section à",
          CancelSubsection: "Annuler la Sous-Section",
          SubsectionName: "Nom de la Sous-Section",
          ConfirmDeleteSection: "Confirmer la suppression de la Section",
          NoSubSections: "Aucune Sous-Section disponible",
          DeleteSection: "Supprimer Section",
          SelectParentSection: "Sélectionner la Section Parent",
          CheckAll: "Tout cocher",
          Insert: "Insertion",
          Read: "Lecture",
          //update page
          home: "Accueil",

          //update page
          UpdateCompany: "Modifier Entreprise",
          textupdate:
            "Veuillez remplir les champs obligatoires ci-dessous et cliquer sur le bouton Enregistrer pour mettre à jour les informations de votre entreprise",
          generalinf: "Informations générales",
          companyname: "Nom de la société",
          address: "Adresse",
          country: "Pays",
          province: "Province",
          city: "Ville",
          postalcode: "Code postal",
          foundingdate: "Date de fondation",
          loadingcompanyinformation:
            "Chargement des informations sur l'entreprise..",
          Loadingfinished: "Chargement terminé",
          orderbook: "Carnet de commande",
          dashboard: "Tableau de bord",
          sales: "Ventes",
          nameproduct: "nom du produit",
          CitySelect: "Veuillez sélectionner une ville",
          Companydeleted: "Entreprise supprimée avec succès!",

          //
          //generale informations
          "company name": "Nom de la société",
          logout: "Se Déconnecter",
          company: "Ajouter une entreprise",
          select: "Sélectionner et accéder aux informations sur l'entreprise :",
          Targetcustomers: "Clientèle cible",
          Market: "Marché",
          Themaincustomers: "Clients",
          Revenuemodel: "Modèles de revenus",
          PleaseInputTheStartYear: "Veuillez saisir l'année de début",

          Businesspartners: " Partenaires d'affaires",
          Businessnumber: "Numéro d'entreprise",
          Typeofindustry: "Type d'industrie",
          BookTotal: "Total du carnet",

          type: "type",

          Postalcode: "Code Postal",
          Foundingdate: "Date de fondation",
          Yearenddate: "Date fin exercice",
          Estimatedannualtaxrate: "Taux d'imposition annuel estimé (%)",
          Numberofemployees: "Nombre d'employés",
          CreateanewStrategictargets: "Créer un nouveau Objectifs stratégiques",

          editcompany: "Modifier les informations",
          deletecompany: "Supprimer l'entreprise",
          deletecompanytext: "Etes-vous sûr que vous voulez supprimer",
          yes: "Oui",
          addnewmanager: "Ajouter un nouveau gestionnaire",
          PleaseInputTheYearsInterval: "Veuillez saisir l'intervalle d'années",
          pleaseenteranumberbetween0and100:
            "Veuillez entrer un nombre entre 0 et 100",
          valuecannotbelessthan0: "la valeur ne peut pas être inférieure à 0",
          addnewholder: "Ajouter un nouveau titulaire",

          no: "Non",
          selectcustomer: "Sélectionner un client",
          selectproduct: "Sélectionner un produit",
          selectdate: "Sélectionner une date",
          addtolist: "Ajouter à la liste",
          selectcustomer: "Sélectionner un client",
          pleaseselectthestrategictarget:
            "Veuillez sélectionner la cible stratégique",
          addtitles: "Ajouter un  titre",
          valuesaddedSuccessfully: "Valeurs ajoutées avec succès",
          Selectsharepourcent: "Sélectionner un  pourcentage",
          selectproduct: "Sélectionner un produit",
          selectdate: "Sélectionner une date",
          selectdatefin: "Sélectionner une date de fin",
          PleaseinputtheShareHolders: "Veuillez saisir les actionnaires",
          Descriptionplaceholder: "Veuillez écrire une description",
          Open: "Ouvert",
          Waiting: "En attente",
          Suspended: "Suspendu",
          Lost: "Perdu",
          writeacostumer: "Veuillez écrire nom du client",
          writeacostumerplaceholder: "Ecrire nom du client",
          writeaproduct: "Veuillez écrire nom du produit",
          writeaproductplaceholder: "Ecrire nom du produit",
          Descriptionplace: " Ecrire une  description",
          Pleaseenteradate: "Veuillez saisir une date",

          Selectopportunitystatus: "Sélectionner le statut de l'opportunité",

          //order book
          orderbookdeleted: "Carnet de commande supprimé!",
          orderbookcreation: "Carnet de commande ajouté!",
          orderbookupdate: "Carnet de commande modifié!",
          deleterow: "Etes-vous sûr que vous voulez supprimer cette ligne?",
          orderbooknamerequired: "Veuillez saisir le nom de la commande!",
          creationdate: "Date de création",
          //opportunity book
          opportunities: "Opportunités",
          opportunitybook: "Carnet d'opportunités",
          opportunitybookdeleted: "Opportunité supprimée!",
          opportunitybookcreation: "Opportunité ajoutée!",
          opportunitybookupdate: "Opportunité modifiée!",
          opportunitybooknamerequired:
            "Veuillez saisir le nom de l'opportunité!",
          Createopportunity: "Créer une opportunité",
          Orderdeletedsuccessfully: "Commande supprimée avec succès",
          Opportunitydeletedsuccessfully: "Opportunité supprimée avec succès",

          OrderupdatedSuccessfully: "Commande mise à jour avec succès",
          OpportunityupdatedSuccessfully: "Opportunité mise à jour avec succès",
          YourCompanyhasbeenaddedsuccessfully:
            "Votre entreprise a été ajoutée avec succès",
          TheCompanyhasbeenupdatedsuccessfully:
            "La société a été mise à jour avec succès",
          Addanothercompany: "Ajouter une autre entreprise",
          OpportunityrevenuedetailsupdatedSuccessfully:
            "Les détails des revenus de l'opportunité ont été mis à jour avec succès",
          //
          ReturntoGeneralInformations: "Retour aux informations générales",
          duplicatelastorderbook: "Dupliquer le dernier carnet de commandes",
          duplicatelastopportunitybook:
            "Dupliquer le dernier carnet d'opportunité",
          Gained: "Gagné",
          //
          //AJoutercompany
          //informations générales

          AddCompany: "Ajouter une entreprise",
          SelectStartPeriod: "Sélectionnez la période de début",

          textButtonAJT:
            "Veuillez remplir les champs obligatoires ci-dessous et cliquez sur le bouton Soumettre pour ajouter les informations de votre entreprise",
          generalInformation: "informations générales",
          Pleaseinputthecompanyname: "Veuillez saisir le nom de l'entreprise",
          ProvinceSelect: "Sélectionnez la province",
          selectthetypeofindustry: "Sélectionner le type d'industrie",
          AddnewtypeIndustry: "Ajouter un nouveau type d'industrie",
          selectthebudget: "Sélectionner un budget",
          PleaseInputTheBusinessNumber:
            "Veuillez entrer le numéro d'entreprise",
          selectthetypeofindustry: "  Sélectionner le type d'industrie",
          IndustryTypes: "Types d'industrie",
          selectthebudget: "Sélectionner un budget",
          selectmanagerstitles: "Sélectionner les titres du manager",
          StartPeriod: "Période de début",
          selectdatedebut: "Sélectionner  une date de début",

          //Clientèle cible
          pleaseinputthefoundingdate: "Veuillez entrer la date de fondation",
          pleaseinputthecity: "Veuillez Sélectionner une  ville",
          pleaseinputtheaddress: "Veuillez entrer l'adresse",

          addtolist: "Ajouter à la liste",
          addnewmanager: "Ajouter un nouveau manager",
          addnewholder: "Ajouter un nouveau dirigeant",
          selectthemarket: "Sélectionner un marché",
          MainCustomers: "Client",
          selectthemaincustomers: "Sélectionner les clients",
          RevenueModel: "Modèle de revenus",
          selecttherevenuemodel: "sélectionner les modèles de revenus",
          AddnewmarketButton: "Ajouter un nouveau marché",
          AddnewcustomerButton: "Ajouter un nouveau client",
          Pleaseentercustomername: "Veuillez entrer le nom du client",
          market: "marché",
          Pleaseinputthe: "Veuillez saisir le",

          RevenueModelButton: "Ajouter un nouveau modèle de revenus",
          BusinesspartnersButton: "Partenaires d'affaires",
          selectthebusinesspartners: "Sélectionner les partenaires d'affaires",
          Addnewbusinesspartner: "Ajouter de nouveaux partenaires d'affaires",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts:
            "Description des services et produits",
          selectShareHolders: "Sélectionner un Actionnaire ",

          Descriptionofoffer: "Description de l’offre",
          Strategictargets: "Objectifs stratégiques",

          selectthestrategictarget: "Sélectionner les cibles stratégiques",
          selectthetypeofactivities: "Sélectionner les type d'activités",
          typeofactivities: " type d'activités",
          pleaseselectthecountry:
            "Veuillez sélectionner le pays de l'entreprise",
          selecttheproductsservices: "Sélectionner des produit / services",
          Typeofactivities: "Type d'activités",
          ProductsServices: "Produits / Services",
          strategicplanning: "Planification stratégique",
          StrategictargetsButton: "Ajouter de nouvelles cibles stratégiques",
          TypeofactivitiesButton: " Ajouter de nouvelles type d'activités",
          ProductsServicesButton: " Ajouter de nouveaux produits / services",
          Startyear: "Année de début",
          YearsInterval: "Intervalle d'années ",
          Pleaseinputthetypeofstrategictarget:
            "Veuillez saisir le type d'objectif stratégique",
          Pleaseinputthedetailseofstrategictarget:
            "Veuillez saisir le détail d'objectif stratégique",

          //Management team
          Managementteam: "Équipe de direction",
          Createanewmanager: " Créer un nouveau gestionnaire",
          Lastname: "Nom du dirigeant",
          Firstname: "Prénom",
          Titles: "Titres",
          Title: "Titre",
          addedsuccessfully: "Les valeurs ont été ajoutées avec succès !",
          Yearsofexperience: "Années d'expériences",
          cancel: "Annuler",
          create: "Créer",
          Delete: "Supprimer",
          save: "Enregistrer",
          edit: "Modifier",
          details: "Détails",
          Managetitles: "Géstion des titres",
          Createanewtitle: " Créer un nouveau titre",
          Addtitle: "Ajouter titre",
          EditTitles: " modifier Titres",
          Label: "Etiquette",
          Titlelabel: "Titre d'étiquette",
          Leadersname: "Nom du dirigeant",
          selectleader: "Sélectionner un dirigeant",
          Managetitles: "Gérer les titres",
          addtitles: "Ajouter un titre",

          Addmanager: "Ajouter le dirigeant",
          // Legal structure
          Legalstructure: "Structure juridique",
          ShareHolders: "Actionnaires",
          CreateanewShareholder: "Ajouter l'actionnaire",
          Name: "Nom",

          Nameshareholders: "Nom des actionnaires",
          percentshares: "% d’actions",

          Shares: "Actions",
          Startdate: "Date début",
          Addshareholders: "",
          submit: "Soumettre l'entreprise",
          Selectdate: "Sélectionner une date",
          Selectmonth: "Sélectionner un moi",
          Selectyear: "Sélectionner une année",
          Pleaseselectacustomer: "Veuillez sélectionner un client",
          Pleaseselectaproduct: "Veuillez sélectionner un produit",

          //Commands order books
          Customer: "Client ",
          Product: "Produit",
          Startdatee: "Date de début",
          Enddate: "Date de fin",
          Priceperday: "Prix par jour",
          Description: "Description",
          OrdercostdetailsupdatedSuccessfully:
            "Détails du coût de la commande mis à jour avec succèss",
          pleaseinputthestartdate: "Veuillez saisir la date de début",
          pleaseselectthetypeofindustry:
            "Veuillez sélectionner le type d'industrie",
          pleaseselectthemarket: "Veuillez sélectionner le  marché",
          pleaseselectthebudget: "Veuillez choisir le budget",
          pleaseselectthecustomer: "Veuillez choisir un client",
          pleaseselecttherevenuemodel:
            "Veuillez sélectionner un modél  de revenue ",

          //order books details
          PleaseInputTheStartPeriod: "Veuillez saisir la période de début  ",
          pleaseselectthebusinesspartner:
            "Veuillez sélectionner le partenaire commercial",
          pleaseselectthestrategictarget:
            "Veuillez sélectionner la cible stratégique",
          pleaseselecttheactivitytype:
            "Veuillez sélectionner le type d'activité",
          Pleaseinputthe: "Veuillez entrer le nom du",
          pleaseselecttheproductservice:
            "Veuillez sélectionner le service /produit",
          Commands: "Commandes",

          RevenueDetails: " Détails des revenus",
          January: "Janvier",

          February: "Février",
          March: "Mars",
          April: "Avril",
          May: "Mai",
          June: "Juin",
          July: "Juillet",
          August: "Août",
          September: "Septembre",
          October: "Octobre",
          November: "Novembre",
          December: "Décembre",
          Action: "Action",
          CreateCustomer: "Créer un client",
          CreateProduct: " Créer un produit",
          Createbook: " Créer une commande",
          RevenueSummary: "Récapitulatif des revenus",
          Createaneworder: "Créer une nouvelle commande",
          Customersname: "Nom du Client",
          Productslabel: "Product's label",
          CreateanewCustomer: "Créer un nouveau client",
          CreateanewProduct: "Créer un nouveau produit",
          Createanewopportunity: "Céer une nouvelle opportunité",
          Selectacompanytodisplayitsdata:
            "Sélectionner une entreprise pour afficher ses données",
          add12months: "fr",
          Pleaseinputthemanagertitle:
            "Veuillez entrer le titre du gestionnaire",
          Pleaseinputthemanagerfirstname:
            "Veuillez saisir le nom du gestionnaire !",
          Pleaseinputthemanagerlastname:
            "Veuillez saisir le prénom du gestionnaire !",
          //Strategic Plan
          titlePage: "Suivi de la planification stratégique",
          title: "Create a new Stratigic Target",
          statut: "Statut",
          Progression: "Progression",
          Departement: "Département",
          pleaseinputthepostalcode: "Veuillez saisir  le code postal ",
          Pleaseenterproductlabel: "Veuillez saisir le libellé du produit",

          //Financment PRET
          Loansmanagement: " Gestion des Prêts",
          Create: "Créer",
          Creationdate: "Date de création",
          Loanname: "Nom du prêt",
          Delete: "Supprimer",
          Details: "Détails",
          Operation: "Opération",
          //Create Pret
          Addaloan: "Ajouter un prêt",
          Creditor: "Créancier",
          Loanamount: "Montant du prêt",
          Terms: "Termes",
          Loandate: "Date de l'emprunt",
          Capitalfreeperiod: "Congé de capital",
          Interestrates: "Taux d'intérêts",
          Particularconditions: "Conditions particulières",
          chooseaterm: "Choose a term",
          sixtymonths: " sixty months",
          thirtymonths: " thirty months",
          ninetymonths: "ninety months",
          //Update

          EditePret: "Modofier le Prêt",
          Edit: "Modifier",
          Cancel: "Annuler",
          // Gestion des Marges
          Addamargin: "Ajouter une marge",
          Marginsmanagement: "Gestion des marges ",
          Institutionname: "Nom de l'institution",
          //Crer une marge
          Authorizedamount: "Montant autorisé",
          //Edite marge
          EditerlaMarge: "Editer la Marge",
          UpdateCompany: "Modifier Entreprise",
          textupdate:
            "Veuillez remplir les champs obligatoires ci-dessous et cliquer sur le bouton Enregistrer pour mettre à jour les informations de votre entreprise",
          generalinf: "Informations générales",
          companyname: "Nom de la société",
          address: "Adresse",
          country: "Pays",
          province: "Province",
          city: "Ville",
          postalcode: "Code postal",
          foundingdate: "Date de fondation",
          loadingcompanyinformation:
            "Chargement des informations sur l'entreprise..",
          Loadingfinished: "Chargement terminé",
          Suretodelete: "Voulez-vous vraiment supprimer ?",
          orderbook: "Carnet de commande",
          dashboard: "Tableau de bord",
          sales: "Ventes",
          Pleaseselectastatus: "Veuillez sélectionner un statut",

          //
          //generale informations
          "company name": "Nom de la société",
          logout: "Se Déconnecter",
          company: "Ajouter une entreprise",
          select: "Sélectionnez et accédez aux informations sur l'entreprise :",
          Targetcustomers: "Clientèle cible",
          Market: "Marché",
          Themaincustomers: "Clients",
          Revenuemodel: "Modèles de revenus",
          Businesspartners: " Partenaires d'affaires",
          Businessnumber: "Numéro d'entreprise",
          Typeofindustry: "Type d'industrie",
          Postalcode: "Code Postal",
          Foundingdate: "Date de fondation",
          Yearenddate: "Date fin exercice",
          Estimatedannualtaxrate: "Taux d'imposition annuel estimé (%)",
          Numberofemployees: "Nombre d'employés",
          editcompany: "Modifier les informations",
          deletecompany: "Supprimer l'entreprise",
          deletecompanytext: "Etes-vous sûr que vous voulez supprimer",
          yes: "Oui",
          no: "Non",
          //order book
          orderbookdeleted: "Carnet de commande supprimé!",
          orderbookcreation: "Carnet de commande ajouté!",
          orderbookupdate: "Carnet de commande modifié!",
          deleterow: "Etes-vous sûr que vous voulez supprimer cette ligne?",
          orderbooknamerequired: "Veuillez saisir le nom de la commande!",
          creationdate: "Date de création",
          //opportunity book
          opportunitybook: "Carnet d'opportunités",
          opportunitybookdeleted: "Opportunité supprimée!",
          opportunitybookcreation: "Opportunité ajoutée!",
          opportunitybookupdate: "Opportunité modifiée!",
          opportunitybooknamerequired:
            "Veuillez saisir le nom de l'opportunité!",
          //
          //AJoutercompany
          //informations générales

          AddCompany: "Ajouter une entreprise",
          textButtonAJT:
            "Veuillez remplir les champs obligatoires ci-dessous et cliquez sur le bouton Soumettre pour ajouter les informations de votre entreprise",
          generalInformation: "informations générales",
          Pleaseinputthecompanyname: "Veuillez saisir le nom de l'entreprise",
          ProvinceSelect: "Sélectionnez la province",
          selectthetypeofindustry: "  Sélectionner le type d'industrie",
          selectthebudget: "Sélectionner un budget",
          //Clientèle cible

          selectthemarket: "Sélectionner un marché",
          MainCustomers: "Client",
          selectthemaincustomers: "Sélectionner les clients",
          RevenueModel: "Modèle de revenus",
          selecttherevenuemodel: "Sélectionner le modèles de revenus",
          AddnewmarketButton: "Ajouter un nouveau marché",
          RevenueModelButton: "Ajouter un nouveau modèle de revenus",
          BusinesspartnersButton: "Partenaires d'affaires",
          selectthebusinesspartners: "Sélectionner les partenaires d'affaires",
          Addnewbusinesspartner: "Ajouter de nouveaux partenaires d'affaires",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts:
            "Description des services et produits",
          Descriptionofoffer: "Description de l’offre",
          Strategictargets: "Objectifs stratégiques",
          selectthestrategictarget: "Sélectionner les cibles stratégiques",
          selectthetypeofactivities: "Sélectionner les type d'activités",
          Typeofactivities: "Type d'activités",
          ProductsServices: "Produits / Services",
          strategicplanning: "Planification stratégique",

          //Management team
          Managementteam: "Équipe de direction",
          Createanewmanager: " Créer un nouveau gestionnaire",
          Lastname: "Nom du dirigeant",
          Firstname: "Prénom",
          Titles: "Titres",
          Title: "Titre",
          addedsuccessfully: "Les valeurs ont été ajoutées avec succès !",
          Yearsofexperience: "Années d'expériences",
          cancel: "Annuler",
          create: "Créer",
          Delete: "Supprimer",
          save: "Enregistrer",
          edit: "Modifier",
          details: "Détails",
          Managetitles: "Géstion des titres",
          Createanewtitle: " Créer un nouveau titre",
          Addtitle: "Ajouter titre",
          EditTitles: " modifier Titres",
          Label: "Etiquette",
          Titlelabel: "Titre d'étiquette",
          Leadersname: "Nom du dirigeant",
          selectleader: "Sélectionner un dirigeant",
          Managetitles: "Gérer les titres",
          Addmanager: "Ajouter le dirigeant",
          // Legal structure
          Legalstructure: "Structure juridique",
          SearchtoSelect: "Rechercher pour sélectionner",

          ShareHolders: "Actionnaires",
          CreateanewShareholder: "Ajouter l'actionnaire",
          Name: "Nom",
          Nameshareholders: "Nom des actionnaires",
          percentshares: "% d’actions",

          Shares: "Actions",
          Startdate: "Date début",
          Addshareholders: "",
          submit: "Soumettre l'entreprise",
        },
      },
    },
    lng: Lang,
    fallbacklng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}

        <Content className="site-layout">{children}</Content>

        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
