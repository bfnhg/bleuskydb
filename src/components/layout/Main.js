import { useState, useEffect,useContext } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { CompanyContext } from '../../contexts/CompanyContext';

import  i18n  from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

const { Header: AntHeader, Content, Sider } = Layout;




function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const {Lang,setLang}=useContext(CompanyContext);


  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  i18n.use(initReactI18next).init({
    resources:{
      en:{
        translation:{
        //update page
        UpdateCompany:"Update Company",
        textupdate:"Please fill out the required fields below and click on the Save button to update your company's informations",
        generalinf:"General information",
        companyname:"Company name",
        address:"Address",
        country:"Country",
        province:"Province",
        city:"City",
        postalcode:"Postal code",
        foundingdate:"Founding date",
        Yearenddate:"Year-end date",
        //
        // general informations
        companyname: "Company name",
        logout: "Sign out",
        company: "Add Company",
        select: "Select and Access Company Information:",
        Targetcustomers: "Target customers",
        Market: "Market",
        Themaincustomers: "The main customers",
        Revenuemodel: "Revenue model",
        Businesspartners: "Business partners",
        Businessnumber: "Business number",
        Typeofindustry: "Type of industry",
        Postalcode: "Postal code",
        Foundingdate: "Founding date",
        Yearenddate: "Year-end date",
        Estimatedannualtaxrate: "Estimated annual tax rate",
        Numberofemployees: "Number of employees" ,
        editcompany:"Edit informations",
        deletecompany:"Delete company",
        deletecompanytext:"Are you sure you want to delete",
        yes:"Yes",
        no:"No",
        //
        //ADD company
          //informations générales

          AddCompany: "Add Company",
          textButtonAJT:"Please fill out the required fields below and click on the Submit button to add your company's informations",
          generalInformation: "General information",
          Pleaseinputthecompanyname: "Please input the company name!",
          ProvinceSelect: "select the province",
          selectthetypeofindustry: "select the type of industry",
          AddnewtypeIndustry: " Add new type",
          selectthebudget: "select the budget",
          //
          //Targetcustomer
          selectthemarket: "select the market",
          MainCustomers: "Main Customers",
          selectthemaincustomers: "select the main customers",
          RevenueModel: "Revenue Model",
          AddnewmarketButton: "Add new market",
          AddnewcustomerButton: " Add new customers",
          RevenueModelButton: "Add new revenue model",
          selecttherevenuemodel: "select the revenue model",
          BusinesspartnersButton: "Business partners",
          selectthebusinesspartners:"select the business partners",
          Addnewbusinesspartner:"Add new business partner",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts: "Description of services and products",
          Strategictargets: " Strategic targets",
          selectthestrategictarget:"select the strategic target",
          selectthetypeofactivities:"select the type of activities",
          Typeofactivities: "Type of activities",
          ProductsServices: "Products/Services",
          StrategictargetsButton: " Add new Strategic targets",
          TypeofactivitiesButton: " Add new Type of activities",
          ProductsServicesButton: " Add new Products/Services",
          //Management team
          Managementteam: " Management team",
          Createanewmanager: "Create a new manager",
          Leadersname:"Leader's name",

          Lastname: "Last name",
          Firstname: "Firstname",
          Titles: "Titles",
          Yearsofexperience: "Years of experience",
          cancel: "cancel",
          create: "create",
          Delete: "delete",
          Managetitles: "",
          Createanewtitle: " Create a new title",
          Addtitle: "Add title",
          EditTitles: "Edit Titles",
          Label: "Label",
          Titlelabel: "Title label",
          selectleader:"Select a leader",
          Managetitles:"Manage titles",
          Addmanager:"Add manager",
          
          // Legal structure
          Legalstructure:"Legal structure",
          ShareHolders: "ShareHolders",
          CreateanewShareholder: "Add the Shareholder",
          Name: "Name",
          Shares: "Shares",
          Startdate: "Start date",
          Addshareholders: "shareholders",
          submit: "Submit company"
        }
      },
      fr:{
        translation:{
        //update page
        UpdateCompany:"Modifier Entreprise",
        textupdate:"Veuillez remplir les champs obligatoires ci-dessous et cliquer sur le bouton Enregistrer pour mettre à jour les informations de votre entreprise",
        generalinf:"Informations générales",
        companyname:"Nom de la société",
        address:"Adresse",
        province:"Province",
        city:"Ville",
        postalcode:"Code postal",
        foundingdate:"Date de fondation",

        //     
        //generale informations
        "company name": "Nom de la société",
        logout: "Se Déconnecter",
        company: "Ajouter une entreprise",
        select: "Sélectionnez et accédez aux informations sur l'entreprise :",
        Targetcustomers: "Clientèle cible",
        Market: "Marché",
        Themaincustomers: "Principaux Clients",
        Revenuemodel: "Modèles de revenus",
        Businesspartners: " Partenaires d'affaires",
        Businessnumber: "Numéro d'entreprise",
        Address: "Addresse",
        Typeofindustr: "Type d'industrie",
        Postalcode: "Code Postal",
        Foundingdate: "Date de fondation",
        Yearenddate: "Date fin exercice",
        Estimatedannualtaxrate: "Taux d'imposition annuel estimé",
        Numberofemployees: "Nombre d'employés" ,
        editcompany:"Modifier les informations",
        deletecompany:"Supprimer l'entreprise",
        deletecompanytext:"Etes-vous sûr que vous voulez supprimer",
        yes:"Oui",
        no:"Non",
        //
        //AJoutercompany
          //informations générales

          AddCompany: "Ajouter une entreprise",
          textButtonAJT:"Veuillez remplir les champs obligatoires ci-dessous et cliquez sur le bouton Soumettre pour ajouter les informations de votre entreprise",
          generalInformation: "informations générales",
          Pleaseinputthecompanyname: "Veuillez saisir le nom de l'entreprise",
          ProvinceSelect: "sélectionnez la province",
          selectthetypeofindustry: "  sélectionner le type d'industrie",
          AddnewtypeIndustry: "Ajouter un nouveau type",
          selectthebudget: "sélectionner un budget",
          //Clientèle cible

          selectthemarket: "sélectionner un marché",
          MainCustomers: "Principaux Clients",
          selectthemaincustomers: "sélectionner les principaux clients",
          RevenueModel: "Modèles de revenus",
          selecttherevenuemodel: "sélectionner le modèles de revenus",
          AddnewmarketButton: "Ajouter un nouveau marché",
          AddnewcustomerButton: "Ajouter un nouveau Client",
          RevenueModelButton: "Ajouter un nouveau modèle de revenus",
          BusinesspartnersButton: "Partenaires d'affaires",
          selectthebusinesspartners:"sélectionner les partenaires d'affaires",
          Addnewbusinesspartner:"Ajouter de nouveaux partenaires d'affaires",
          //Description of services and products Cibles stratégiques
          Descriptionofservicesandproducts: "Description des services et produits",
          Strategictargets: " Cibles stratégiques",
          selectthestrategictarget:"sélectionner les cibles stratégiques",
          selectthetypeofactivities:"sélectionner les type d'activités",
          selecttheproductsservices:"select the products / services",
          Typeofactivities: "Type d'activités",
          ProductsServices: "Produits / Services",
          StrategictargetsButton: "Ajouter de nouvelles cibles stratégiques",
          TypeofactivitiesButton: " Ajouter de nouvelles Type d'activités",
          ProductsServicesButton: " Ajouter de nouveaux Produits / Services",
          //Management team
          Managementteam: "Équipe de direction",
          Createanewmanager: " Créer un nouveau gestionnaire",
          Lastname: "Nom ",
          Firstname: "Prénom",
          Titles: "Titre",
          Yearsofexperience: "Années d'expériences",
          cancel: "annuler",
          create: "créer",
          Delete: "Supprimer",
          Managetitles: "Géstion des titres",
          Createanewtitle: " Créer un nouveau titre",
          Addtitle: "Ajouter titre",
          EditTitles: " modifier Titres",
          Label: "étiquette",
          Titlelabel: "Titre d'étiquette",
          Leadersname:"Nom du dirigeant",
          selectleader:"sélectionner un dirigeant",
          Managetitles:"Gérer les titres",
          Addmanager:"Ajouter le dirigeant",
          // Legal structure
          Legalstructure:"Structure juridique",
          ShareHolders: "Actionnaires",
          CreateanewShareholder: "Ajouter l'actionnaire",
          Name: "Nom",
          Shares: "Actions",
          Startdate: "Date début",
          Addshareholders: "",
          submit: "Soumettre l'entreprise"

        }
      }
    },
    lng:Lang,
    fallbacklng:"en",
    debug:true,
    interpolation:{
      escapeValue:false,
    },
  })

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
