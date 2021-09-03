PGDMP     6    (                y            myShop    13.0    13.0 E               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    25276    myShop    DATABASE     g   CREATE DATABASE "myShop" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "myShop";
                postgres    false            �            1259    25442    cart    TABLE     p   CREATE TABLE public.cart (
    idcostumer bigint NOT NULL,
    idproduct bigint NOT NULL,
    amount integer
);
    DROP TABLE public.cart;
       public         heap    postgres    false            �            1259    25316    category    TABLE     �   CREATE TABLE public.category (
    idcategory integer NOT NULL,
    descriptioncategory text,
    namecategory character varying(40)
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    25314    category_idcategory_seq    SEQUENCE     �   CREATE SEQUENCE public.category_idcategory_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.category_idcategory_seq;
       public          postgres    false    204                       0    0    category_idcategory_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.category_idcategory_seq OWNED BY public.category.idcategory;
          public          postgres    false    203            �            1259    25279    costumer    TABLE     c   CREATE TABLE public.costumer (
    idcostumer integer NOT NULL,
    emailcostumer text NOT NULL
);
    DROP TABLE public.costumer;
       public         heap    postgres    false            �            1259    25277    costumer_idcostumer_seq    SEQUENCE     �   CREATE SEQUENCE public.costumer_idcostumer_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.costumer_idcostumer_seq;
       public          postgres    false    201                       0    0    costumer_idcostumer_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.costumer_idcostumer_seq OWNED BY public.costumer.idcostumer;
          public          postgres    false    200            �            1259    25301    costumerdata    TABLE     �   CREATE TABLE public.costumerdata (
    idcostumer bigint NOT NULL,
    namecostumer character varying(40) NOT NULL,
    phonenumbercostumer character varying(15),
    passwordcostumer text
);
     DROP TABLE public.costumerdata;
       public         heap    postgres    false            �            1259    25385    home    TABLE     �   CREATE TABLE public.home (
    idhome integer NOT NULL,
    homeaddress character varying(60),
    city character varying(50),
    descriptionhome text
);
    DROP TABLE public.home;
       public         heap    postgres    false            �            1259    25383    home_idhome_seq    SEQUENCE     �   CREATE SEQUENCE public.home_idhome_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.home_idhome_seq;
       public          postgres    false    211                       0    0    home_idhome_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.home_idhome_seq OWNED BY public.home.idhome;
          public          postgres    false    210            �            1259    25327    product    TABLE     �   CREATE TABLE public.product (
    idproduct integer NOT NULL,
    descriptionproduct text,
    nameproduct character varying(40),
    amountproduct integer
);
    DROP TABLE public.product;
       public         heap    postgres    false            �            1259    25325    product_idproduct_seq    SEQUENCE     �   CREATE SEQUENCE public.product_idproduct_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_idproduct_seq;
       public          postgres    false    206                       0    0    product_idproduct_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.product_idproduct_seq OWNED BY public.product.idproduct;
          public          postgres    false    205            �            1259    25360    productdata    TABLE     �   CREATE TABLE public.productdata (
    idproduct bigint NOT NULL,
    idcategory bigint,
    idprovider bigint,
    price double precision,
    urlimg text
);
    DROP TABLE public.productdata;
       public         heap    postgres    false            �            1259    25351 	   providers    TABLE     �   CREATE TABLE public.providers (
    idprovider integer NOT NULL,
    nameprovider character varying(40),
    emailprovider text,
    phonenumber character varying(15)
);
    DROP TABLE public.providers;
       public         heap    postgres    false            �            1259    25349    providers_idprovider_seq    SEQUENCE     �   CREATE SEQUENCE public.providers_idprovider_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.providers_idprovider_seq;
       public          postgres    false    208                       0    0    providers_idprovider_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.providers_idprovider_seq OWNED BY public.providers.idprovider;
          public          postgres    false    207            �            1259    25396    purchase    TABLE     �   CREATE TABLE public.purchase (
    idpurchase integer NOT NULL,
    idcostumer bigint,
    idhome bigint,
    datepurchase date,
    timepurchase time without time zone,
    processed boolean
);
    DROP TABLE public.purchase;
       public         heap    postgres    false            �            1259    25394    purchase_idpurchase_seq    SEQUENCE     �   CREATE SEQUENCE public.purchase_idpurchase_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.purchase_idpurchase_seq;
       public          postgres    false    213                       0    0    purchase_idpurchase_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.purchase_idpurchase_seq OWNED BY public.purchase.idpurchase;
          public          postgres    false    212            �            1259    25457    purchaseproduct    TABLE     {   CREATE TABLE public.purchaseproduct (
    idproduct bigint NOT NULL,
    idpurchase bigint NOT NULL,
    amount integer
);
 #   DROP TABLE public.purchaseproduct;
       public         heap    postgres    false            X           2604    25319    category idcategory    DEFAULT     z   ALTER TABLE ONLY public.category ALTER COLUMN idcategory SET DEFAULT nextval('public.category_idcategory_seq'::regclass);
 B   ALTER TABLE public.category ALTER COLUMN idcategory DROP DEFAULT;
       public          postgres    false    204    203    204            W           2604    25282    costumer idcostumer    DEFAULT     z   ALTER TABLE ONLY public.costumer ALTER COLUMN idcostumer SET DEFAULT nextval('public.costumer_idcostumer_seq'::regclass);
 B   ALTER TABLE public.costumer ALTER COLUMN idcostumer DROP DEFAULT;
       public          postgres    false    200    201    201            [           2604    25388    home idhome    DEFAULT     j   ALTER TABLE ONLY public.home ALTER COLUMN idhome SET DEFAULT nextval('public.home_idhome_seq'::regclass);
 :   ALTER TABLE public.home ALTER COLUMN idhome DROP DEFAULT;
       public          postgres    false    211    210    211            Y           2604    25330    product idproduct    DEFAULT     v   ALTER TABLE ONLY public.product ALTER COLUMN idproduct SET DEFAULT nextval('public.product_idproduct_seq'::regclass);
 @   ALTER TABLE public.product ALTER COLUMN idproduct DROP DEFAULT;
       public          postgres    false    205    206    206            Z           2604    25354    providers idprovider    DEFAULT     |   ALTER TABLE ONLY public.providers ALTER COLUMN idprovider SET DEFAULT nextval('public.providers_idprovider_seq'::regclass);
 C   ALTER TABLE public.providers ALTER COLUMN idprovider DROP DEFAULT;
       public          postgres    false    208    207    208            \           2604    25399    purchase idpurchase    DEFAULT     z   ALTER TABLE ONLY public.purchase ALTER COLUMN idpurchase SET DEFAULT nextval('public.purchase_idpurchase_seq'::regclass);
 B   ALTER TABLE public.purchase ALTER COLUMN idpurchase DROP DEFAULT;
       public          postgres    false    213    212    213                      0    25442    cart 
   TABLE DATA           =   COPY public.cart (idcostumer, idproduct, amount) FROM stdin;
    public          postgres    false    214   OR                 0    25316    category 
   TABLE DATA           Q   COPY public.category (idcategory, descriptioncategory, namecategory) FROM stdin;
    public          postgres    false    204   lR                  0    25279    costumer 
   TABLE DATA           =   COPY public.costumer (idcostumer, emailcostumer) FROM stdin;
    public          postgres    false    201   �R                 0    25301    costumerdata 
   TABLE DATA           g   COPY public.costumerdata (idcostumer, namecostumer, phonenumbercostumer, passwordcostumer) FROM stdin;
    public          postgres    false    202   �R       
          0    25385    home 
   TABLE DATA           J   COPY public.home (idhome, homeaddress, city, descriptionhome) FROM stdin;
    public          postgres    false    211   �S                 0    25327    product 
   TABLE DATA           \   COPY public.product (idproduct, descriptionproduct, nameproduct, amountproduct) FROM stdin;
    public          postgres    false    206   NT                 0    25360    productdata 
   TABLE DATA           W   COPY public.productdata (idproduct, idcategory, idprovider, price, urlimg) FROM stdin;
    public          postgres    false    209   �T                 0    25351 	   providers 
   TABLE DATA           Y   COPY public.providers (idprovider, nameprovider, emailprovider, phonenumber) FROM stdin;
    public          postgres    false    208   �T                 0    25396    purchase 
   TABLE DATA           i   COPY public.purchase (idpurchase, idcostumer, idhome, datepurchase, timepurchase, processed) FROM stdin;
    public          postgres    false    213   YU                 0    25457    purchaseproduct 
   TABLE DATA           H   COPY public.purchaseproduct (idproduct, idpurchase, amount) FROM stdin;
    public          postgres    false    215   �U                  0    0    category_idcategory_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.category_idcategory_seq', 2, true);
          public          postgres    false    203                       0    0    costumer_idcostumer_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.costumer_idcostumer_seq', 4, true);
          public          postgres    false    200                       0    0    home_idhome_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.home_idhome_seq', 4, true);
          public          postgres    false    210                       0    0    product_idproduct_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.product_idproduct_seq', 5, true);
          public          postgres    false    205                       0    0    providers_idprovider_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.providers_idprovider_seq', 3, true);
          public          postgres    false    207                        0    0    purchase_idpurchase_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.purchase_idpurchase_seq', 12, true);
          public          postgres    false    212            p           2606    25446    cart cart_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (idcostumer, idproduct);
 8   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_pkey;
       public            postgres    false    214    214            d           2606    25324    category category_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (idcategory);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    204            ^           2606    25289 #   costumer costumer_emailcostumer_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.costumer
    ADD CONSTRAINT costumer_emailcostumer_key UNIQUE (emailcostumer);
 M   ALTER TABLE ONLY public.costumer DROP CONSTRAINT costumer_emailcostumer_key;
       public            postgres    false    201            `           2606    25287    costumer costumer_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.costumer
    ADD CONSTRAINT costumer_pkey PRIMARY KEY (idcostumer);
 @   ALTER TABLE ONLY public.costumer DROP CONSTRAINT costumer_pkey;
       public            postgres    false    201            b           2606    25308    costumerdata costumerdata_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.costumerdata
    ADD CONSTRAINT costumerdata_pkey PRIMARY KEY (idcostumer);
 H   ALTER TABLE ONLY public.costumerdata DROP CONSTRAINT costumerdata_pkey;
       public            postgres    false    202            l           2606    25393    home home_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.home
    ADD CONSTRAINT home_pkey PRIMARY KEY (idhome);
 8   ALTER TABLE ONLY public.home DROP CONSTRAINT home_pkey;
       public            postgres    false    211            f           2606    25335    product product_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (idproduct);
 >   ALTER TABLE ONLY public.product DROP CONSTRAINT product_pkey;
       public            postgres    false    206            j           2606    25367    productdata productdata_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.productdata
    ADD CONSTRAINT productdata_pkey PRIMARY KEY (idproduct);
 F   ALTER TABLE ONLY public.productdata DROP CONSTRAINT productdata_pkey;
       public            postgres    false    209            h           2606    25359    providers providers_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.providers
    ADD CONSTRAINT providers_pkey PRIMARY KEY (idprovider);
 B   ALTER TABLE ONLY public.providers DROP CONSTRAINT providers_pkey;
       public            postgres    false    208            n           2606    25401    purchase purchase_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_pkey PRIMARY KEY (idpurchase);
 @   ALTER TABLE ONLY public.purchase DROP CONSTRAINT purchase_pkey;
       public            postgres    false    213            r           2606    25461 $   purchaseproduct purchaseproduct_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.purchaseproduct
    ADD CONSTRAINT purchaseproduct_pkey PRIMARY KEY (idproduct, idpurchase);
 N   ALTER TABLE ONLY public.purchaseproduct DROP CONSTRAINT purchaseproduct_pkey;
       public            postgres    false    215    215            y           2606    25447    cart cart_idcostumer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_idcostumer_fkey FOREIGN KEY (idcostumer) REFERENCES public.costumer(idcostumer) ON UPDATE CASCADE ON DELETE CASCADE;
 C   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_idcostumer_fkey;
       public          postgres    false    201    214    2912            z           2606    25452    cart cart_idproduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_idproduct_fkey FOREIGN KEY (idproduct) REFERENCES public.product(idproduct) ON UPDATE CASCADE ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.cart DROP CONSTRAINT cart_idproduct_fkey;
       public          postgres    false    206    2918    214            s           2606    25309 )   costumerdata costumerdata_idcostumer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.costumerdata
    ADD CONSTRAINT costumerdata_idcostumer_fkey FOREIGN KEY (idcostumer) REFERENCES public.costumer(idcostumer) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public.costumerdata DROP CONSTRAINT costumerdata_idcostumer_fkey;
       public          postgres    false    202    201    2912            v           2606    25378 '   productdata productdata_idcategory_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productdata
    ADD CONSTRAINT productdata_idcategory_fkey FOREIGN KEY (idcategory) REFERENCES public.category(idcategory) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.productdata DROP CONSTRAINT productdata_idcategory_fkey;
       public          postgres    false    2916    204    209            t           2606    25368 &   productdata productdata_idproduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productdata
    ADD CONSTRAINT productdata_idproduct_fkey FOREIGN KEY (idproduct) REFERENCES public.product(idproduct) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.productdata DROP CONSTRAINT productdata_idproduct_fkey;
       public          postgres    false    2918    209    206            u           2606    25373 '   productdata productdata_idprovider_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productdata
    ADD CONSTRAINT productdata_idprovider_fkey FOREIGN KEY (idprovider) REFERENCES public.providers(idprovider) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.productdata DROP CONSTRAINT productdata_idprovider_fkey;
       public          postgres    false    2920    208    209            w           2606    25402 !   purchase purchase_idcostumer_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_idcostumer_fkey FOREIGN KEY (idcostumer) REFERENCES public.costumer(idcostumer) ON UPDATE CASCADE ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.purchase DROP CONSTRAINT purchase_idcostumer_fkey;
       public          postgres    false    201    2912    213            x           2606    25407    purchase purchase_idhome_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase
    ADD CONSTRAINT purchase_idhome_fkey FOREIGN KEY (idhome) REFERENCES public.home(idhome) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.purchase DROP CONSTRAINT purchase_idhome_fkey;
       public          postgres    false    211    213    2924            {           2606    25462 .   purchaseproduct purchaseproduct_idproduct_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchaseproduct
    ADD CONSTRAINT purchaseproduct_idproduct_fkey FOREIGN KEY (idproduct) REFERENCES public.product(idproduct) ON UPDATE CASCADE ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.purchaseproduct DROP CONSTRAINT purchaseproduct_idproduct_fkey;
       public          postgres    false    215    206    2918            |           2606    25467 /   purchaseproduct purchaseproduct_idpurchase_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchaseproduct
    ADD CONSTRAINT purchaseproduct_idpurchase_fkey FOREIGN KEY (idpurchase) REFERENCES public.purchase(idpurchase) ON UPDATE CASCADE ON DELETE CASCADE;
 Y   ALTER TABLE ONLY public.purchaseproduct DROP CONSTRAINT purchaseproduct_idpurchase_fkey;
       public          postgres    false    213    215    2926                  x������ � �         9   x�3�,��,V �D��Ē����J���"����̼tC�2#N�HX��+F��� e#�          *   x�3�,I-.1tH�M���K���2�#���EL�Db���� B�w         �   x�5�9�0  ���I@Z48L�� ���D'��?�~L-�n��	��Z̀�<�5@?�abB2U��g&:c��v^ǫr�_W��o�����C��A�n�h�\v�j��!��7�h�/@�������Br6
h�Z·b���������t��:��}��q!� �7�      
   �   x�}��
�0���)�i����Tb�Ao^�5���JR/>�={�	�0[8�{�d�ӥR�����8�-��b���'�"���C*z�F�Wp�dC�_ȯ���`���(���q �VT֚��X���T�^�B�7\(5p         Z   x�3���,V ���T����������������"����̼tN���`�i�e�Yՙ�M��X�<�X�� %�$5�NCS�=... ]�+�         5   x�3�4B3S���b��҂������<�Ң.C��)'�]�Z\����� Z$N         L   x�3�,(�/�LI-R(I-.Q(3����鹉�9z�����F���F�FF\�h�P�a�16�2«���=... (3|         b   x�m���0Cѳ�K��*Y���	�?�������8��	�����E���=��pMD������(e`����d{h�^��~۳'�ke�|Ʃc�`}�         .   x�3�4�4�2��\����F@6�4�44 s`�!��2R1z\\\ �     