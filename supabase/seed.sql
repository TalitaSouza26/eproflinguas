-- GERADO por scripts/generate-seed.mts. Não edite à mão:
-- altere src/lib/quiz/curriculum.ts e rode `npm run seed:generate`.

begin;

delete from question_choices;
delete from questions;
delete from badges;
delete from phases;
delete from tracks;

-- Casa e família
insert into tracks (id, slug, title, band, position) values
  ('367e05b0-1a94-ba18-5430-7fd42a907021', 'casa-familia', 'Casa e família', '1-2', 1);

insert into phases (id, track_id, number, title, format) values
  ('594645e0-f989-a01c-6207-cb3281d69ca1', '367e05b0-1a94-ba18-5430-7fd42a907021', 1, 'Reconhecer — parte 1', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('023ccd1a-09d0-d0f7-33c3-596d5d77e99d', '594645e0-f989-a01c-6207-cb3281d69ca1', 'Descobridor de Casa e família', 'Reconheceu as primeiras palavras pela imagem.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('5b5f9209-3975-ada0-730e-6004e5bc86fa', '594645e0-f989-a01c-6207-cb3281d69ca1', 1, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/mother.webp', 'mother', 'Mother significa mãe.', null),
  ('17ceb431-0312-cc25-886c-e18a20e99aed', '594645e0-f989-a01c-6207-cb3281d69ca1', 2, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/father.webp', 'father', 'Father significa pai.', null),
  ('0dafee88-aa97-38c3-5f4e-688c120b81b0', '594645e0-f989-a01c-6207-cb3281d69ca1', 3, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/sister.webp', 'sister', 'Sister significa irmã.', null),
  ('d3ed6cef-eed8-102b-f714-838b2ae3d9a9', '594645e0-f989-a01c-6207-cb3281d69ca1', 4, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/brother.webp', 'brother', 'Brother significa irmão.', null),
  ('253b9301-a0a3-1071-2143-68eaa7be4f34', '594645e0-f989-a01c-6207-cb3281d69ca1', 5, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/baby.webp', 'baby', 'Baby significa bebê.', null),
  ('4f7a21d5-18cb-db44-ee3e-585efd0b182c', '594645e0-f989-a01c-6207-cb3281d69ca1', 6, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/family.webp', 'family', 'Family significa família.', null),
  ('78c278dd-8ed6-438e-4a07-24a18e64de04', '594645e0-f989-a01c-6207-cb3281d69ca1', 7, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/house.webp', 'house', 'House significa casa.', null),
  ('e140ffe1-941d-ceca-bae0-de97aa018d70', '594645e0-f989-a01c-6207-cb3281d69ca1', 8, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/garden.webp', 'garden', 'Garden significa jardim.', null),
  ('31aab318-c98b-b9ba-7301-0e756db604d6', '594645e0-f989-a01c-6207-cb3281d69ca1', 9, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/mother.webp', 'mother', 'Mother significa mãe.', null),
  ('46d3f3e2-f2ae-1484-2ee3-f17ee01b4015', '594645e0-f989-a01c-6207-cb3281d69ca1', 10, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/father.webp', 'father', 'Father significa pai.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('3942827e-72c3-0fca-2d4a-0fc1243bc873', '5b5f9209-3975-ada0-730e-6004e5bc86fa', 1, 'Baby', false),
  ('8ed75bef-ae7b-c16a-70a5-366e84b0e32f', '5b5f9209-3975-ada0-730e-6004e5bc86fa', 2, 'Mother', true),
  ('1f156cec-4313-3c8a-fb72-2d32cc4b09a9', '5b5f9209-3975-ada0-730e-6004e5bc86fa', 3, 'Table', false),
  ('ecfeda66-51e1-557d-d0e3-8b77578bb8b5', '5b5f9209-3975-ada0-730e-6004e5bc86fa', 4, 'House', false),
  ('81b55184-d132-7a4a-6b73-33cd6d0dbd66', '17ceb431-0312-cc25-886c-e18a20e99aed', 1, 'Window', false),
  ('93d2e249-9a10-d604-4714-780b7844e047', '17ceb431-0312-cc25-886c-e18a20e99aed', 2, 'Father', true),
  ('c7baa301-cde0-4abd-da65-a3a3923ca8a2', '17ceb431-0312-cc25-886c-e18a20e99aed', 3, 'Garden', false),
  ('957e4ef6-c147-045d-e7a6-4629813e4401', '17ceb431-0312-cc25-886c-e18a20e99aed', 4, 'Mother', false),
  ('e92a32f7-8fc9-8671-a495-f99e28f58462', '0dafee88-aa97-38c3-5f4e-688c120b81b0', 1, 'Sister', true),
  ('6001cdce-73ec-7ce1-1fe2-29444c2ad980', '0dafee88-aa97-38c3-5f4e-688c120b81b0', 2, 'Door', false),
  ('b1d3b3a1-f597-eb29-812a-d6209a0f7693', '0dafee88-aa97-38c3-5f4e-688c120b81b0', 3, 'Kitchen', false),
  ('06d06372-4c8d-c568-91a0-b833b4ad5abf', '0dafee88-aa97-38c3-5f4e-688c120b81b0', 4, 'Chair', false),
  ('4d4d6ed0-76ab-2517-82d3-10fcf8cd045b', 'd3ed6cef-eed8-102b-f714-838b2ae3d9a9', 1, 'Bedroom', false),
  ('5e44ce99-3934-aa1a-1c0b-798901d2a789', 'd3ed6cef-eed8-102b-f714-838b2ae3d9a9', 2, 'Chair', false),
  ('afe19ebe-a535-5bb5-dd6f-ff01a13a563b', 'd3ed6cef-eed8-102b-f714-838b2ae3d9a9', 3, 'Brother', true),
  ('a2024004-87e8-65af-571a-a533c0dd7ab4', 'd3ed6cef-eed8-102b-f714-838b2ae3d9a9', 4, 'Father', false),
  ('535b42e9-3b63-264f-070e-840088a00af2', '253b9301-a0a3-1071-2143-68eaa7be4f34', 1, 'Baby', true),
  ('be019ef3-468e-fd4d-aef9-3d54cfcf85a2', '253b9301-a0a3-1071-2143-68eaa7be4f34', 2, 'Sofa', false),
  ('1ce5c3ba-fc08-b4e6-a2b8-070e072fb61d', '253b9301-a0a3-1071-2143-68eaa7be4f34', 3, 'House', false),
  ('f651b75e-ab77-aace-2d0e-979d0df75a21', '253b9301-a0a3-1071-2143-68eaa7be4f34', 4, 'Table', false),
  ('d1af7c29-840f-d724-bec6-1b6bd0e4f03b', '4f7a21d5-18cb-db44-ee3e-585efd0b182c', 1, 'Window', false),
  ('b95605d1-4c24-337b-67a9-4a45214a8098', '4f7a21d5-18cb-db44-ee3e-585efd0b182c', 2, 'Father', false),
  ('f17fcb64-c64f-dfc3-bb41-f270eafb1841', '4f7a21d5-18cb-db44-ee3e-585efd0b182c', 3, 'House', false),
  ('01f5c9e2-923a-2477-d0c1-7d647bbdc2ec', '4f7a21d5-18cb-db44-ee3e-585efd0b182c', 4, 'Family', true),
  ('36a7328b-5146-b7bf-c6fd-ddfaf42f2804', '78c278dd-8ed6-438e-4a07-24a18e64de04', 1, 'Window', false),
  ('e8f5001f-00ab-6b37-52b5-df84279c08f3', '78c278dd-8ed6-438e-4a07-24a18e64de04', 2, 'House', true),
  ('3d10083a-bbfe-85e8-3201-76338fdb60d1', '78c278dd-8ed6-438e-4a07-24a18e64de04', 3, 'Garden', false),
  ('43c7e51d-c7a2-ae02-7083-48365c177390', '78c278dd-8ed6-438e-4a07-24a18e64de04', 4, 'Sister', false),
  ('291037cc-753e-b483-ec65-b95c7d3a8d22', 'e140ffe1-941d-ceca-bae0-de97aa018d70', 1, 'Bed', false),
  ('5595006a-9dd5-d15e-cbaa-ea3fbe014b49', 'e140ffe1-941d-ceca-bae0-de97aa018d70', 2, 'Table', false),
  ('e2bb8b08-3f1e-54ab-d581-5a9057d73cec', 'e140ffe1-941d-ceca-bae0-de97aa018d70', 3, 'Garden', true),
  ('a56facd1-35d2-a401-5222-bca797149f0c', 'e140ffe1-941d-ceca-bae0-de97aa018d70', 4, 'Chair', false),
  ('e3ffc98e-2016-12e1-8907-8edb84a002cf', '31aab318-c98b-b9ba-7301-0e756db604d6', 1, 'Bed', false),
  ('15a48e00-8866-28ee-5f8e-39f8055a6ee8', '31aab318-c98b-b9ba-7301-0e756db604d6', 2, 'Bedroom', false),
  ('63fde2c7-f491-7298-d830-1c3fad727e2a', '31aab318-c98b-b9ba-7301-0e756db604d6', 3, 'Mother', true),
  ('3d087c83-73bc-251d-ca85-f3d9f877a3fa', '31aab318-c98b-b9ba-7301-0e756db604d6', 4, 'House', false),
  ('d5343ebb-6552-f43f-27f7-e67748529302', '46d3f3e2-f2ae-1484-2ee3-f17ee01b4015', 1, 'Baby', false),
  ('40e0bd04-e4d8-5a67-4614-4551272796c0', '46d3f3e2-f2ae-1484-2ee3-f17ee01b4015', 2, 'House', false),
  ('5eae4840-7b08-2fa1-6986-57a9e3395c84', '46d3f3e2-f2ae-1484-2ee3-f17ee01b4015', 3, 'Kitchen', false),
  ('49a8f522-765d-fd9e-f632-d2cb91f36674', '46d3f3e2-f2ae-1484-2ee3-f17ee01b4015', 4, 'Father', true);

insert into phases (id, track_id, number, title, format) values
  ('a4cb95e1-6af6-f259-440b-44df9c24fbd2', '367e05b0-1a94-ba18-5430-7fd42a907021', 2, 'Reconhecer — parte 2', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('10db9a6c-c844-5982-9c37-e9045a0ea9bc', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 'Explorador de Casa e família', 'Reconheceu o segundo bloco de palavras.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('ba22a2c0-3bce-ca5b-7068-6237f644dd1b', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 1, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/door.webp', 'door', 'Door significa porta.', null),
  ('cdc979bc-f9b5-3a7d-b765-cd9a42f0509a', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 2, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/window.webp', 'window', 'Window significa janela.', null),
  ('5de85ad8-ca73-7459-72df-f3a31eafc5aa', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 3, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/bed.webp', 'bed', 'Bed significa cama.', null),
  ('b723e1c6-39b7-4e4c-fd59-d81eb90c3807', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 4, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/table.webp', 'table', 'Table significa mesa.', null),
  ('4cbca665-846b-87df-61c8-74ada1f23993', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 5, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/chair.webp', 'chair', 'Chair significa cadeira.', null),
  ('1429f2e7-6041-63ed-0cd3-f7d3ab199db6', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 6, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/kitchen.webp', 'kitchen', 'Kitchen significa cozinha.', null),
  ('75a3d282-e679-adc6-8720-3cac3f2e124c', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 7, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/bedroom.webp', 'bedroom', 'Bedroom significa quarto.', null),
  ('522332ba-dd30-e180-be01-f341332ae9c6', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 8, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/sofa.webp', 'sofa', 'Sofa significa sofá.', null),
  ('ebd3753b-1648-8246-cb76-312a346e2101', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 9, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/door.webp', 'door', 'Door significa porta.', null),
  ('5109c4c7-e259-c9b6-e451-3a6c4abd0b57', 'a4cb95e1-6af6-f259-440b-44df9c24fbd2', 10, 'image_word', 'Casa e família', 'What is this?', 'O que é isto?', '/quiz/window.webp', 'window', 'Window significa janela.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('b574b631-d975-a298-a2c3-a14384603dbf', 'ba22a2c0-3bce-ca5b-7068-6237f644dd1b', 1, 'Father', false),
  ('4b45f196-4512-fd75-ea94-63061d13540c', 'ba22a2c0-3bce-ca5b-7068-6237f644dd1b', 2, 'Mother', false),
  ('6db8828b-13e8-703b-3230-7fde650a56d2', 'ba22a2c0-3bce-ca5b-7068-6237f644dd1b', 3, 'Window', false),
  ('ef6a98dc-7c54-208f-1bd7-606cedcbcf41', 'ba22a2c0-3bce-ca5b-7068-6237f644dd1b', 4, 'Door', true),
  ('4d615a1f-9078-abf9-16dd-d60120475c8c', 'cdc979bc-f9b5-3a7d-b765-cd9a42f0509a', 1, 'Mother', false),
  ('426a3f09-b17a-f8bb-6925-4db021aad2a0', 'cdc979bc-f9b5-3a7d-b765-cd9a42f0509a', 2, 'Family', false),
  ('d41ad741-5fb7-e70b-7205-b1b8052e8271', 'cdc979bc-f9b5-3a7d-b765-cd9a42f0509a', 3, 'Window', true),
  ('7d3342ca-0b8f-026a-f81f-9c11b430a36a', 'cdc979bc-f9b5-3a7d-b765-cd9a42f0509a', 4, 'Baby', false),
  ('0107d950-c1bb-38e2-3b97-dd8dba69c1d0', '5de85ad8-ca73-7459-72df-f3a31eafc5aa', 1, 'Bed', true),
  ('0dfb125d-3758-5559-229b-032ded8771a6', '5de85ad8-ca73-7459-72df-f3a31eafc5aa', 2, 'Sofa', false),
  ('c65ec682-f0ea-5115-445e-701bfcf4bf2a', '5de85ad8-ca73-7459-72df-f3a31eafc5aa', 3, 'House', false),
  ('fbd93ceb-ac73-4b65-1a4a-844df87642f8', '5de85ad8-ca73-7459-72df-f3a31eafc5aa', 4, 'Garden', false),
  ('d572cf34-0d8a-194a-8d98-de6b1577560c', 'b723e1c6-39b7-4e4c-fd59-d81eb90c3807', 1, 'House', false),
  ('e3f509f0-c502-a0b8-7c73-f1d547f9696e', 'b723e1c6-39b7-4e4c-fd59-d81eb90c3807', 2, 'Bedroom', false),
  ('61929f25-d90b-8ea8-f4f5-80bee9925278', 'b723e1c6-39b7-4e4c-fd59-d81eb90c3807', 3, 'Chair', false),
  ('ccffb799-e23e-c85d-d3a1-439c29749bc7', 'b723e1c6-39b7-4e4c-fd59-d81eb90c3807', 4, 'Table', true),
  ('f435ce6d-9c2f-fca4-b099-cea45a8d6a63', '4cbca665-846b-87df-61c8-74ada1f23993', 1, 'Window', false),
  ('3c472abe-7ab2-dfe5-7047-ef0910be46b2', '4cbca665-846b-87df-61c8-74ada1f23993', 2, 'Chair', true),
  ('88ed344b-e808-912b-d9aa-f136285fc785', '4cbca665-846b-87df-61c8-74ada1f23993', 3, 'Table', false),
  ('590f9bd6-0cec-2751-de65-f05c4640c799', '4cbca665-846b-87df-61c8-74ada1f23993', 4, 'Baby', false),
  ('329c42b6-6c3f-2468-ff88-be83f820679e', '1429f2e7-6041-63ed-0cd3-f7d3ab199db6', 1, 'Window', false),
  ('d049ca9b-753b-1da0-e739-56f234a74e8a', '1429f2e7-6041-63ed-0cd3-f7d3ab199db6', 2, 'Kitchen', true),
  ('d8d950a2-8abf-58ea-6a5d-8632e65e8cb6', '1429f2e7-6041-63ed-0cd3-f7d3ab199db6', 3, 'Father', false),
  ('a6c2c08e-9d16-f913-8efc-3c3f193aca09', '1429f2e7-6041-63ed-0cd3-f7d3ab199db6', 4, 'Mother', false),
  ('c43fc752-58cf-3ebb-4ba2-5bdf1c33a368', '75a3d282-e679-adc6-8720-3cac3f2e124c', 1, 'Bedroom', true),
  ('f6f1fb38-3613-ab3c-053e-9cb8c8a7a2c4', '75a3d282-e679-adc6-8720-3cac3f2e124c', 2, 'Chair', false),
  ('79316add-a453-6b91-dbab-c165baf9401d', '75a3d282-e679-adc6-8720-3cac3f2e124c', 3, 'Window', false),
  ('4c053361-8ace-255b-8c8d-26e2edf16cde', '75a3d282-e679-adc6-8720-3cac3f2e124c', 4, 'Family', false),
  ('24f8e708-9a13-0ee0-5e66-7a33284f23d3', '522332ba-dd30-e180-be01-f341332ae9c6', 1, 'Sofa', true),
  ('365a9120-6029-d549-de21-b929ccfe3c84', '522332ba-dd30-e180-be01-f341332ae9c6', 2, 'Bed', false),
  ('bec46738-d872-a0bc-d4b0-6d7254961889', '522332ba-dd30-e180-be01-f341332ae9c6', 3, 'Table', false),
  ('6899fa53-cef8-90de-af10-cc0fe3bee23f', '522332ba-dd30-e180-be01-f341332ae9c6', 4, 'Window', false),
  ('5d6a65c1-2183-17a0-6189-af7e29e79752', 'ebd3753b-1648-8246-cb76-312a346e2101', 1, 'Door', true),
  ('7b42e5ec-08e4-8170-9e1e-1ddc803a64cd', 'ebd3753b-1648-8246-cb76-312a346e2101', 2, 'Family', false),
  ('e1a3fb6f-fd78-ddf9-537a-17eeba56fb61', 'ebd3753b-1648-8246-cb76-312a346e2101', 3, 'Table', false),
  ('494d6176-b734-6bb5-74a1-ca4b197b14d7', 'ebd3753b-1648-8246-cb76-312a346e2101', 4, 'Mother', false),
  ('b9da6675-f0a0-ca1d-de67-0d257ff9c6d4', '5109c4c7-e259-c9b6-e451-3a6c4abd0b57', 1, 'Window', true),
  ('cd3e64ac-9894-527a-b68e-09d4849449e7', '5109c4c7-e259-c9b6-e451-3a6c4abd0b57', 2, 'House', false),
  ('ac8e88c7-dba9-fa8b-638a-0b450b4b1f8c', '5109c4c7-e259-c9b6-e451-3a6c4abd0b57', 3, 'Chair', false),
  ('3654df1d-d647-7faf-6331-b0f4e53f5172', '5109c4c7-e259-c9b6-e451-3a6c4abd0b57', 4, 'Baby', false);

insert into phases (id, track_id, number, title, format) values
  ('79731751-df99-077c-5933-b600855750e7', '367e05b0-1a94-ba18-5430-7fd42a907021', 3, 'Compreender — parte 1', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('c7179b4c-c75f-1aa2-e77f-5d8fa6a1d46b', '79731751-df99-077c-5933-b600855750e7', 'Leitor de Casa e família', 'Leu e compreendeu as palavras em inglês.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('8f5d6912-8416-b0d2-a703-f1cbbe219ae1', '79731751-df99-077c-5933-b600855750e7', 1, 'word_meaning', 'Casa e família', 'Mother', null, null, 'mother', 'Mother significa mãe.', null),
  ('ebbcca99-1454-19d7-2868-cb7088c0ff8a', '79731751-df99-077c-5933-b600855750e7', 2, 'word_meaning', 'Casa e família', 'Father', null, null, 'father', 'Father significa pai.', null),
  ('b5ce1409-761b-c99f-20b1-3c8ee94908b4', '79731751-df99-077c-5933-b600855750e7', 3, 'word_meaning', 'Casa e família', 'Sister', null, null, 'sister', 'Sister significa irmã.', null),
  ('8078bd5b-c828-6c0f-7150-32cfc1e96334', '79731751-df99-077c-5933-b600855750e7', 4, 'word_meaning', 'Casa e família', 'Brother', null, null, 'brother', 'Brother significa irmão.', null),
  ('deb18493-9e21-14d7-b775-7f432a09b007', '79731751-df99-077c-5933-b600855750e7', 5, 'word_meaning', 'Casa e família', 'Baby', null, null, 'baby', 'Baby significa bebê.', null),
  ('ff6a05f6-3cdf-059a-b6fd-f226a0fa254d', '79731751-df99-077c-5933-b600855750e7', 6, 'word_meaning', 'Casa e família', 'Family', null, null, 'family', 'Family significa família.', null),
  ('937a2074-c011-1b63-9abb-4d986ead2a44', '79731751-df99-077c-5933-b600855750e7', 7, 'word_meaning', 'Casa e família', 'House', null, null, 'house', 'House significa casa.', null),
  ('0560774f-491e-0889-f8c3-cd56feed34bd', '79731751-df99-077c-5933-b600855750e7', 8, 'word_meaning', 'Casa e família', 'Garden', null, null, 'garden', 'Garden significa jardim.', null),
  ('2330d873-1066-8f6e-05b4-1d0a0057c7d0', '79731751-df99-077c-5933-b600855750e7', 9, 'word_meaning', 'Casa e família', 'Mother', null, null, 'mother', 'Mother significa mãe.', null),
  ('33b58bc0-3a7a-4afe-842b-52ea267594ca', '79731751-df99-077c-5933-b600855750e7', 10, 'word_meaning', 'Casa e família', 'Father', null, null, 'father', 'Father significa pai.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('0ffe575c-5941-0596-f949-ac4419f939e7', '8f5d6912-8416-b0d2-a703-f1cbbe219ae1', 1, 'cama', false),
  ('27b6773b-d0ff-995c-fe0a-4b09c29fa27e', '8f5d6912-8416-b0d2-a703-f1cbbe219ae1', 2, 'mãe', true),
  ('37cc9c2f-76b4-f699-5686-ddc21a70d5cd', '8f5d6912-8416-b0d2-a703-f1cbbe219ae1', 3, 'jardim', false),
  ('2722bad4-ed90-61fc-30d5-06582af9c911', '8f5d6912-8416-b0d2-a703-f1cbbe219ae1', 4, 'porta', false),
  ('3b87648f-93b6-b44a-c9a2-e2aaf9312f3c', 'ebbcca99-1454-19d7-2868-cb7088c0ff8a', 1, 'cama', false),
  ('634285d9-df4e-2b5e-90ea-90fe23229e6b', 'ebbcca99-1454-19d7-2868-cb7088c0ff8a', 2, 'cozinha', false),
  ('81aa5afd-5a75-e3cc-ed2e-7e4c0929ffd8', 'ebbcca99-1454-19d7-2868-cb7088c0ff8a', 3, 'pai', true),
  ('36514fb3-501d-5adc-817b-6c3e1d7348a8', 'ebbcca99-1454-19d7-2868-cb7088c0ff8a', 4, 'irmã', false),
  ('84664b0b-186d-9203-16d7-366dec37ed75', 'b5ce1409-761b-c99f-20b1-3c8ee94908b4', 1, 'quarto', false),
  ('bd79f064-5bce-12ad-fb61-6ff4aa68ab73', 'b5ce1409-761b-c99f-20b1-3c8ee94908b4', 2, 'cozinha', false),
  ('5d987f12-493e-0757-4cfc-ce2542f4df9b', 'b5ce1409-761b-c99f-20b1-3c8ee94908b4', 3, 'sofá', false),
  ('cb87c988-db0d-56b3-f80a-245fa7d6dc07', 'b5ce1409-761b-c99f-20b1-3c8ee94908b4', 4, 'irmã', true),
  ('5f5028ed-c9f8-07dc-8b94-fef3ea5686cc', '8078bd5b-c828-6c0f-7150-32cfc1e96334', 1, 'bebê', false),
  ('d118e301-663c-0afa-fd21-ae0a9539efc3', '8078bd5b-c828-6c0f-7150-32cfc1e96334', 2, 'sofá', false),
  ('b323a980-90ca-f949-1400-2f32b8266ffa', '8078bd5b-c828-6c0f-7150-32cfc1e96334', 3, 'família', false),
  ('ae2f04b0-86e0-3a48-591a-3e4bcd79d73c', '8078bd5b-c828-6c0f-7150-32cfc1e96334', 4, 'irmão', true),
  ('b5d4ca13-e29f-0f6b-2db9-9fe9f5a31ce3', 'deb18493-9e21-14d7-b775-7f432a09b007', 1, 'bebê', true),
  ('9c1f7a6b-663a-0c91-5290-50b44d841c28', 'deb18493-9e21-14d7-b775-7f432a09b007', 2, 'janela', false),
  ('86ca67aa-2d55-237e-95d5-736770d178f3', 'deb18493-9e21-14d7-b775-7f432a09b007', 3, 'mesa', false),
  ('ccbb4078-2738-e4d2-daad-7995320d2fd0', 'deb18493-9e21-14d7-b775-7f432a09b007', 4, 'pai', false),
  ('d6fa690f-a998-596a-9059-08ce80376916', 'ff6a05f6-3cdf-059a-b6fd-f226a0fa254d', 1, 'família', true),
  ('ce593196-843f-4fe1-ec02-76dc4e3084ff', 'ff6a05f6-3cdf-059a-b6fd-f226a0fa254d', 2, 'cadeira', false),
  ('f5d2433d-e670-0854-356c-e97d48710d13', 'ff6a05f6-3cdf-059a-b6fd-f226a0fa254d', 3, 'sofá', false),
  ('8e1de1d9-5837-d2ec-ffcc-e4e9a0c44e10', 'ff6a05f6-3cdf-059a-b6fd-f226a0fa254d', 4, 'cama', false),
  ('9d59a8d9-0e92-c5d7-3432-da4cf031cf82', '937a2074-c011-1b63-9abb-4d986ead2a44', 1, 'casa', true),
  ('5ec26e6c-4740-6938-6b3c-8827bbf1bcdd', '937a2074-c011-1b63-9abb-4d986ead2a44', 2, 'família', false),
  ('44a47faf-17be-62b8-e236-6f0cd892851a', '937a2074-c011-1b63-9abb-4d986ead2a44', 3, 'irmã', false),
  ('195539b4-c54d-8305-0949-23d6a2409ac0', '937a2074-c011-1b63-9abb-4d986ead2a44', 4, 'quarto', false),
  ('4089965c-47d7-18c5-aa2d-7331691fd9de', '0560774f-491e-0889-f8c3-cd56feed34bd', 1, 'quarto', false),
  ('c7b3b2d5-4fc5-9c5d-6e13-01b3e3b93aa6', '0560774f-491e-0889-f8c3-cd56feed34bd', 2, 'jardim', true),
  ('536bcb5e-194f-06cd-3df2-4644d9763b65', '0560774f-491e-0889-f8c3-cd56feed34bd', 3, 'cadeira', false),
  ('420139be-3681-6dbb-1c37-568460285c32', '0560774f-491e-0889-f8c3-cd56feed34bd', 4, 'irmã', false),
  ('4a2ee6db-4659-1e87-d219-5695dfc3eb00', '2330d873-1066-8f6e-05b4-1d0a0057c7d0', 1, 'casa', false),
  ('03daf9a5-ce72-d2a5-8792-62213f4a9c1b', '2330d873-1066-8f6e-05b4-1d0a0057c7d0', 2, 'janela', false),
  ('928e9f9b-d4b4-469f-d796-6e323fc138f6', '2330d873-1066-8f6e-05b4-1d0a0057c7d0', 3, 'mãe', true),
  ('ea42cd6d-4371-c5a5-493c-52abb9720b6e', '2330d873-1066-8f6e-05b4-1d0a0057c7d0', 4, 'jardim', false),
  ('e146059d-5474-b6cd-2995-9f04b94c169b', '33b58bc0-3a7a-4afe-842b-52ea267594ca', 1, 'sofá', false),
  ('aafb586d-7f57-e11f-511e-2c854d08a8d2', '33b58bc0-3a7a-4afe-842b-52ea267594ca', 2, 'jardim', false),
  ('a624053c-92e6-030e-4523-54bbe1b2b12a', '33b58bc0-3a7a-4afe-842b-52ea267594ca', 3, 'pai', true),
  ('07f9f13f-808c-9568-1ccb-a6ed52f26e1f', '33b58bc0-3a7a-4afe-842b-52ea267594ca', 4, 'cama', false);

insert into phases (id, track_id, number, title, format) values
  ('99526b3a-082c-3202-4c74-72103f3309eb', '367e05b0-1a94-ba18-5430-7fd42a907021', 4, 'Compreender — parte 2', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('1ee2104a-92a1-e9fc-ff6d-f6f3c4e8942a', '99526b3a-082c-3202-4c74-72103f3309eb', 'Mestre de Casa e família', 'Dominou o vocabulário da trilha.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('dd58cc55-fab2-29c5-82b9-0a735b5e25da', '99526b3a-082c-3202-4c74-72103f3309eb', 1, 'word_meaning', 'Casa e família', 'Door', null, null, 'door', 'Door significa porta.', null),
  ('a6621f92-044a-78f5-abd7-cc633a1e78d8', '99526b3a-082c-3202-4c74-72103f3309eb', 2, 'word_meaning', 'Casa e família', 'Window', null, null, 'window', 'Window significa janela.', null),
  ('ef78ff3d-e881-e3b3-3cf3-c339b4456e28', '99526b3a-082c-3202-4c74-72103f3309eb', 3, 'word_meaning', 'Casa e família', 'Bed', null, null, 'bed', 'Bed significa cama.', null),
  ('7bd975bb-c546-08a1-4d58-c4a164a776ea', '99526b3a-082c-3202-4c74-72103f3309eb', 4, 'word_meaning', 'Casa e família', 'Table', null, null, 'table', 'Table significa mesa.', null),
  ('5bcfbd97-415a-558d-c322-11b112252f27', '99526b3a-082c-3202-4c74-72103f3309eb', 5, 'word_meaning', 'Casa e família', 'Chair', null, null, 'chair', 'Chair significa cadeira.', null),
  ('a8f04f64-d65e-ccf9-67f6-b04b7a701f00', '99526b3a-082c-3202-4c74-72103f3309eb', 6, 'word_meaning', 'Casa e família', 'Kitchen', null, null, 'kitchen', 'Kitchen significa cozinha.', null),
  ('b0d0989c-0381-998f-9c73-5f183a5eb319', '99526b3a-082c-3202-4c74-72103f3309eb', 7, 'word_meaning', 'Casa e família', 'Bedroom', null, null, 'bedroom', 'Bedroom significa quarto.', null),
  ('8803e023-d546-d4f8-2468-ad6fe517f692', '99526b3a-082c-3202-4c74-72103f3309eb', 8, 'word_meaning', 'Casa e família', 'Sofa', null, null, 'sofa', 'Sofa significa sofá.', null),
  ('43844293-8351-7ba2-8a80-ad99561db576', '99526b3a-082c-3202-4c74-72103f3309eb', 9, 'word_meaning', 'Casa e família', 'Door', null, null, 'door', 'Door significa porta.', null),
  ('05310138-5366-680b-4e11-cfeb84066291', '99526b3a-082c-3202-4c74-72103f3309eb', 10, 'word_meaning', 'Casa e família', 'Window', null, null, 'window', 'Window significa janela.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('512da955-5f38-a463-0086-ff3b1041ec1a', 'dd58cc55-fab2-29c5-82b9-0a735b5e25da', 1, 'cama', false),
  ('ec699c79-3d32-9813-3d71-ac092ba5b14b', 'dd58cc55-fab2-29c5-82b9-0a735b5e25da', 2, 'família', false),
  ('d24d540e-79fd-f9d6-7b72-c16e7ed63dbb', 'dd58cc55-fab2-29c5-82b9-0a735b5e25da', 3, 'irmão', false),
  ('a58e3475-db5e-6fcc-6934-bfa881d12a59', 'dd58cc55-fab2-29c5-82b9-0a735b5e25da', 4, 'porta', true),
  ('59965ce5-bbea-2727-c561-13d54050140b', 'a6621f92-044a-78f5-abd7-cc633a1e78d8', 1, 'janela', true),
  ('ab9a3cf8-7403-3073-a642-438fae70ed6a', 'a6621f92-044a-78f5-abd7-cc633a1e78d8', 2, 'irmão', false),
  ('cfe270a5-0db8-ca17-6833-b89dfcc2d494', 'a6621f92-044a-78f5-abd7-cc633a1e78d8', 3, 'quarto', false),
  ('ebc4456c-c9d4-bad2-e37a-6ef9d3873945', 'a6621f92-044a-78f5-abd7-cc633a1e78d8', 4, 'cozinha', false),
  ('a7c2f31f-1f06-ca9f-4595-752d159c363e', 'ef78ff3d-e881-e3b3-3cf3-c339b4456e28', 1, 'mãe', false),
  ('b2762544-cd0e-58e7-732d-936b9b554610', 'ef78ff3d-e881-e3b3-3cf3-c339b4456e28', 2, 'irmã', false),
  ('07b7628d-31b7-6b8f-9c8a-e831f26652f3', 'ef78ff3d-e881-e3b3-3cf3-c339b4456e28', 3, 'cama', true),
  ('34841cbc-4a95-2e3d-eb47-ea0756a0f6b3', 'ef78ff3d-e881-e3b3-3cf3-c339b4456e28', 4, 'mesa', false),
  ('6091cb5e-af23-2341-54d6-69802dfb40a5', '7bd975bb-c546-08a1-4d58-c4a164a776ea', 1, 'cadeira', false),
  ('633796b0-f02f-3cc2-14c0-5cfeaca37a78', '7bd975bb-c546-08a1-4d58-c4a164a776ea', 2, 'cozinha', false),
  ('7a7fa6b4-e178-0b06-095a-497678cb6b43', '7bd975bb-c546-08a1-4d58-c4a164a776ea', 3, 'mesa', true),
  ('38ccb965-4883-9092-89c9-0c2708ca792b', '7bd975bb-c546-08a1-4d58-c4a164a776ea', 4, 'irmã', false),
  ('53e0883a-6161-dc0a-2238-9fa28b068485', '5bcfbd97-415a-558d-c322-11b112252f27', 1, 'casa', false),
  ('7b57f911-3932-4914-b6f4-aa44ac651189', '5bcfbd97-415a-558d-c322-11b112252f27', 2, 'mesa', false),
  ('e589de26-958c-62d2-5622-93a013afae5e', '5bcfbd97-415a-558d-c322-11b112252f27', 3, 'janela', false),
  ('ba4f15ce-2be5-0fcd-7e78-7069eec3cc71', '5bcfbd97-415a-558d-c322-11b112252f27', 4, 'cadeira', true),
  ('65ed46d3-3bfd-2cd4-f9df-a734229fb15f', 'a8f04f64-d65e-ccf9-67f6-b04b7a701f00', 1, 'pai', false),
  ('14db1de5-fe21-1005-c058-5ada952a6d4c', 'a8f04f64-d65e-ccf9-67f6-b04b7a701f00', 2, 'sofá', false),
  ('8a010e9b-c316-21bd-a403-0decec33e36c', 'a8f04f64-d65e-ccf9-67f6-b04b7a701f00', 3, 'cozinha', true),
  ('84fc1145-657e-269f-a848-0eb1b7a48811', 'a8f04f64-d65e-ccf9-67f6-b04b7a701f00', 4, 'jardim', false),
  ('007c912a-d474-8d41-0b58-f238523df905', 'b0d0989c-0381-998f-9c73-5f183a5eb319', 1, 'quarto', true),
  ('1cd2d8bf-6085-bdb4-04dc-396b796bcd14', 'b0d0989c-0381-998f-9c73-5f183a5eb319', 2, 'jardim', false),
  ('76a77381-3728-60fd-de32-30c4bbb6d398', 'b0d0989c-0381-998f-9c73-5f183a5eb319', 3, 'irmão', false),
  ('f1a90e65-c7f9-0508-20e9-5b1418cc26cd', 'b0d0989c-0381-998f-9c73-5f183a5eb319', 4, 'casa', false),
  ('78bb333b-80dc-c523-72bd-0f7fed8fdc08', '8803e023-d546-d4f8-2468-ad6fe517f692', 1, 'cozinha', false),
  ('f4b0839f-a820-0d37-165f-4301d19717c2', '8803e023-d546-d4f8-2468-ad6fe517f692', 2, 'jardim', false),
  ('0dd54bb1-1eeb-a4c1-71fc-2828674c359b', '8803e023-d546-d4f8-2468-ad6fe517f692', 3, 'irmão', false),
  ('832b86bb-5754-e1b6-eb40-3ae41747240c', '8803e023-d546-d4f8-2468-ad6fe517f692', 4, 'sofá', true),
  ('4b760ad5-a5c2-ec6e-fbb4-177ddda22646', '43844293-8351-7ba2-8a80-ad99561db576', 1, 'sofá', false),
  ('f3199f3b-4153-a497-4f97-1447f3d06649', '43844293-8351-7ba2-8a80-ad99561db576', 2, 'pai', false),
  ('739f2011-05e7-6922-dd2e-160df1f386aa', '43844293-8351-7ba2-8a80-ad99561db576', 3, 'porta', true),
  ('7ba51f52-49a4-823d-0351-4f7b85a19bd9', '43844293-8351-7ba2-8a80-ad99561db576', 4, 'família', false),
  ('0189be6c-1b88-955a-8ab5-83144d34cb9d', '05310138-5366-680b-4e11-cfeb84066291', 1, 'mesa', false),
  ('29b04a2d-bacb-6baa-7696-9eb156cf20b9', '05310138-5366-680b-4e11-cfeb84066291', 2, 'cama', false),
  ('c309f366-09e3-784a-c697-5936ba8e50f8', '05310138-5366-680b-4e11-cfeb84066291', 3, 'mãe', false),
  ('a30dd8d0-6f78-44c5-9a62-34505ce45b2c', '05310138-5366-680b-4e11-cfeb84066291', 4, 'janela', true);

-- Escola
insert into tracks (id, slug, title, band, position) values
  ('c7f1660a-2abb-1e41-0fc9-d6e48f6d9a97', 'escola', 'Escola', '1-2', 2);

insert into phases (id, track_id, number, title, format) values
  ('c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 'c7f1660a-2abb-1e41-0fc9-d6e48f6d9a97', 1, 'Reconhecer — parte 1', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('58ea566a-70be-d98a-8f72-ae945b00f482', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 'Descobridor de Escola', 'Reconheceu as primeiras palavras pela imagem.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('7517b6b5-4c9b-36d9-2f39-15f143c0b180', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 1, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/school.webp', 'school', 'School significa escola.', null),
  ('8b694da0-e829-96d1-79c5-f5afe6f772d8', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 2, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/classroom.webp', 'classroom', 'Classroom significa sala de aula.', null),
  ('4a832b48-022e-c488-b8c4-0b4ac1065bc5', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 3, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/teacher.webp', 'teacher', 'Teacher significa professor.', null),
  ('a6670114-285b-84ed-740b-f7bf4b5bb62f', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 4, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/student.webp', 'student', 'Student significa aluno.', null),
  ('06ae641c-8fd3-4b84-a729-8746b47f532c', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 5, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/friend.webp', 'friend', 'Friend significa amigo.', null),
  ('e25e6c04-26a6-7186-91dc-3b7c95efc094', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 6, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/desk.webp', 'desk', 'Desk significa carteira.', null),
  ('25ec80d3-8967-5646-8465-4b19332806a6', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 7, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/board.webp', 'board', 'Board significa quadro.', null),
  ('6a2dcc9b-9083-ac0f-3c63-f0207a6d88dd', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 8, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/bag.webp', 'bag', 'Bag significa mochila.', null),
  ('da671d64-7f2c-f09b-e91a-6fc2d7d17be6', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 9, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/school.webp', 'school', 'School significa escola.', null),
  ('3d5b8738-5927-59d8-7c4b-0b4742b3a25d', 'c5e52f8b-7037-1e0b-5fb1-37fb01232b3a', 10, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/classroom.webp', 'classroom', 'Classroom significa sala de aula.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('6b62ddc7-220d-2019-a5eb-dcf1554251c4', '7517b6b5-4c9b-36d9-2f39-15f143c0b180', 1, 'Board', false),
  ('12a97a30-d562-0749-5fe3-2f964b955e30', '7517b6b5-4c9b-36d9-2f39-15f143c0b180', 2, 'School', true),
  ('12343ee9-b921-7086-5419-1e8f15dfa155', '7517b6b5-4c9b-36d9-2f39-15f143c0b180', 3, 'Paper', false),
  ('976622aa-a1db-31cc-2747-da47aee1530b', '7517b6b5-4c9b-36d9-2f39-15f143c0b180', 4, 'Bag', false),
  ('aa5941ed-b9f3-a624-4d66-0a930d08a0e9', '8b694da0-e829-96d1-79c5-f5afe6f772d8', 1, 'Notebook', false),
  ('457c1334-b03e-47bd-2724-e411eb811625', '8b694da0-e829-96d1-79c5-f5afe6f772d8', 2, 'Pencil', false),
  ('aa9684b6-0454-247a-020b-9738db46c057', '8b694da0-e829-96d1-79c5-f5afe6f772d8', 3, 'Classroom', true),
  ('0ea29c1b-c04c-04e3-b708-66e7a55f1b25', '8b694da0-e829-96d1-79c5-f5afe6f772d8', 4, 'Eraser', false),
  ('b6bcfe9a-68af-9e13-b4f8-ed9fc9003d8b', '4a832b48-022e-c488-b8c4-0b4ac1065bc5', 1, 'Paper', false),
  ('fc755dd5-5c28-dbe9-7324-98c115c29895', '4a832b48-022e-c488-b8c4-0b4ac1065bc5', 2, 'Classroom', false),
  ('8088b604-1a8a-7f36-1e5e-4caae8787c4b', '4a832b48-022e-c488-b8c4-0b4ac1065bc5', 3, 'Teacher', true),
  ('6e91da4a-b880-afa8-ecdb-124f8249d699', '4a832b48-022e-c488-b8c4-0b4ac1065bc5', 4, 'Pencil', false),
  ('3a4216a3-08af-8588-a1e8-1daab3e7aeea', 'a6670114-285b-84ed-740b-f7bf4b5bb62f', 1, 'Board', false),
  ('10e4b397-2c79-dcd8-f9ad-0442617957e7', 'a6670114-285b-84ed-740b-f7bf4b5bb62f', 2, 'Student', true),
  ('16ecbb9d-34b2-eff5-676b-34f5c36d5a44', 'a6670114-285b-84ed-740b-f7bf4b5bb62f', 3, 'Desk', false),
  ('a655fb5f-6ec8-9440-8cca-2f45c65c7f81', 'a6670114-285b-84ed-740b-f7bf4b5bb62f', 4, 'Pencil', false),
  ('b881895e-59f1-a831-489a-c81ed32e99f0', '06ae641c-8fd3-4b84-a729-8746b47f532c', 1, 'Pencil', false),
  ('3a156ee9-ac3f-7b33-2de8-58b09ee4f948', '06ae641c-8fd3-4b84-a729-8746b47f532c', 2, 'Scissors', false),
  ('261a5c25-fef2-5adb-cb34-e367fdff918d', '06ae641c-8fd3-4b84-a729-8746b47f532c', 3, 'Friend', true),
  ('2dbda3f9-0e7a-90c2-f713-96dd30ce8fb3', '06ae641c-8fd3-4b84-a729-8746b47f532c', 4, 'Desk', false),
  ('fd779e93-ab93-7839-a2d8-430f9048da6f', 'e25e6c04-26a6-7186-91dc-3b7c95efc094', 1, 'Desk', true),
  ('8389e577-a67d-2c94-4e71-8b85ed576fe0', 'e25e6c04-26a6-7186-91dc-3b7c95efc094', 2, 'Board', false),
  ('1552e074-7a0e-adce-bb98-e91b62d4c3b0', 'e25e6c04-26a6-7186-91dc-3b7c95efc094', 3, 'Pen', false),
  ('3801593f-25a5-dd29-fa09-c8cf33527ea6', 'e25e6c04-26a6-7186-91dc-3b7c95efc094', 4, 'Pencil', false),
  ('71ed9a0d-6edd-c2f5-e117-7675595b7634', '25ec80d3-8967-5646-8465-4b19332806a6', 1, 'Scissors', false),
  ('e6c03462-0319-f81d-1556-c4e4f69ab6cd', '25ec80d3-8967-5646-8465-4b19332806a6', 2, 'Board', true),
  ('f328b10e-658c-4a23-a3f6-e0facd9d26f4', '25ec80d3-8967-5646-8465-4b19332806a6', 3, 'Eraser', false),
  ('15905868-76f8-7094-03c2-a6f816c6df4a', '25ec80d3-8967-5646-8465-4b19332806a6', 4, 'School', false),
  ('542fae4f-c1aa-0dd9-8c9e-526030e46f49', '6a2dcc9b-9083-ac0f-3c63-f0207a6d88dd', 1, 'Eraser', false),
  ('4c96bd4b-54cd-cba6-e00f-481cc86f53be', '6a2dcc9b-9083-ac0f-3c63-f0207a6d88dd', 2, 'Ruler', false),
  ('6be9fbd9-3c8a-9d8f-cda5-f731d3ee5fbf', '6a2dcc9b-9083-ac0f-3c63-f0207a6d88dd', 3, 'Classroom', false),
  ('c73dcbd1-a302-2aca-b45b-511de099d9b7', '6a2dcc9b-9083-ac0f-3c63-f0207a6d88dd', 4, 'Bag', true),
  ('f70dbd3a-06f5-f9c6-98a2-c59118c7f719', 'da671d64-7f2c-f09b-e91a-6fc2d7d17be6', 1, 'Pencil', false),
  ('07d996d8-2b11-25ed-0958-5e9834141138', 'da671d64-7f2c-f09b-e91a-6fc2d7d17be6', 2, 'School', true),
  ('48f54914-5d98-e9ba-5333-71625ba30995', 'da671d64-7f2c-f09b-e91a-6fc2d7d17be6', 3, 'Book', false),
  ('8e2ae03a-34e7-49b8-ad0b-106a3b14b358', 'da671d64-7f2c-f09b-e91a-6fc2d7d17be6', 4, 'Notebook', false),
  ('38497ff1-e77e-d49b-cb35-c0d02f5c414f', '3d5b8738-5927-59d8-7c4b-0b4742b3a25d', 1, 'Classroom', true),
  ('1b2b7c5c-4d74-f3fe-37b1-8867f5135d12', '3d5b8738-5927-59d8-7c4b-0b4742b3a25d', 2, 'Paper', false),
  ('d6d1ff67-35c8-e25a-561e-5d5effb346eb', '3d5b8738-5927-59d8-7c4b-0b4742b3a25d', 3, 'School', false),
  ('acc7c71a-70a7-5a58-b54a-bda927713118', '3d5b8738-5927-59d8-7c4b-0b4742b3a25d', 4, 'Eraser', false);

insert into phases (id, track_id, number, title, format) values
  ('159c3246-05d4-a78e-a2d8-a48ce129e755', 'c7f1660a-2abb-1e41-0fc9-d6e48f6d9a97', 2, 'Reconhecer — parte 2', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('c1d2a08b-ad63-0124-942a-cf88531d2e2e', '159c3246-05d4-a78e-a2d8-a48ce129e755', 'Explorador de Escola', 'Reconheceu o segundo bloco de palavras.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('c7857180-a9d5-8dc9-5d97-8f107a241750', '159c3246-05d4-a78e-a2d8-a48ce129e755', 1, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/book.webp', 'book', 'Book significa livro.', null),
  ('371e1f0a-fe44-58bd-2ccf-163be31132ab', '159c3246-05d4-a78e-a2d8-a48ce129e755', 2, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/notebook.webp', 'notebook', 'Notebook significa caderno.', null),
  ('c0f5b546-ddf1-e282-c2ee-1d8cde513392', '159c3246-05d4-a78e-a2d8-a48ce129e755', 3, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/pen.webp', 'pen', 'Pen significa caneta.', null),
  ('5c72f9fa-ba56-12e8-8e6d-589226eda530', '159c3246-05d4-a78e-a2d8-a48ce129e755', 4, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/pencil.webp', 'pencil', 'Pencil significa lápis.', null),
  ('a26cbc59-db73-7e0f-51d3-3546173f061e', '159c3246-05d4-a78e-a2d8-a48ce129e755', 5, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/eraser.webp', 'eraser', 'Eraser significa borracha.', null),
  ('ebca7d7d-118e-2d8f-515f-603f888eab2f', '159c3246-05d4-a78e-a2d8-a48ce129e755', 6, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/ruler.webp', 'ruler', 'Ruler significa régua.', null),
  ('754838bd-520f-b73a-846d-e3b4e5b955e0', '159c3246-05d4-a78e-a2d8-a48ce129e755', 7, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/paper.webp', 'paper', 'Paper significa papel.', null),
  ('3c18fbc6-075b-9b08-cd7d-da25296b5bd2', '159c3246-05d4-a78e-a2d8-a48ce129e755', 8, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/scissors.webp', 'scissors', 'Scissors significa tesoura.', null),
  ('e4887cfb-da44-80b9-8a69-347a76f540f4', '159c3246-05d4-a78e-a2d8-a48ce129e755', 9, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/book.webp', 'book', 'Book significa livro.', null),
  ('c585dab6-5a53-73a7-b5d8-236e6f0da23d', '159c3246-05d4-a78e-a2d8-a48ce129e755', 10, 'image_word', 'Escola', 'What is this?', 'O que é isto?', '/quiz/notebook.webp', 'notebook', 'Notebook significa caderno.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('ed9ed020-7ea9-b4a8-acc2-a0a8f03e5a98', 'c7857180-a9d5-8dc9-5d97-8f107a241750', 1, 'Book', true),
  ('36ba18bf-d741-0c26-3e97-d2a521cb2efd', 'c7857180-a9d5-8dc9-5d97-8f107a241750', 2, 'Eraser', false),
  ('f69616c0-ffd5-6550-af56-de65c773d9ff', 'c7857180-a9d5-8dc9-5d97-8f107a241750', 3, 'Classroom', false),
  ('9298f119-26e1-9b68-5d67-4153d2bd967c', 'c7857180-a9d5-8dc9-5d97-8f107a241750', 4, 'Bag', false),
  ('1f83f19d-6712-51de-ff57-15bb25497db6', '371e1f0a-fe44-58bd-2ccf-163be31132ab', 1, 'Student', false),
  ('b09f8a20-95c4-dfe5-9df8-1c18e0364936', '371e1f0a-fe44-58bd-2ccf-163be31132ab', 2, 'School', false),
  ('de36537f-90eb-67a4-b88d-9895a5efd33a', '371e1f0a-fe44-58bd-2ccf-163be31132ab', 3, 'Friend', false),
  ('97014aca-a098-2713-3ffa-3d123683a823', '371e1f0a-fe44-58bd-2ccf-163be31132ab', 4, 'Notebook', true),
  ('8cf0a651-191e-6804-5456-cdb35df22944', 'c0f5b546-ddf1-e282-c2ee-1d8cde513392', 1, 'Bag', false),
  ('9b527862-4efd-028f-8b7b-243d2b639005', 'c0f5b546-ddf1-e282-c2ee-1d8cde513392', 2, 'Pen', true),
  ('80c98f9d-9886-aeea-8038-f00f83b15494', 'c0f5b546-ddf1-e282-c2ee-1d8cde513392', 3, 'Desk', false),
  ('0d62ba30-6aa7-a683-dfce-efc695c9bc7d', 'c0f5b546-ddf1-e282-c2ee-1d8cde513392', 4, 'Eraser', false),
  ('994fc809-3b09-9ee7-0033-449350bcd08a', '5c72f9fa-ba56-12e8-8e6d-589226eda530', 1, 'Bag', false),
  ('7dbaf410-5ebb-e506-f544-c070b9b705e6', '5c72f9fa-ba56-12e8-8e6d-589226eda530', 2, 'Pencil', true),
  ('a543c409-d1ab-3dfb-88c7-533571192209', '5c72f9fa-ba56-12e8-8e6d-589226eda530', 3, 'Notebook', false),
  ('4c9aa36f-02c3-fcdb-219b-7a3ce220209a', '5c72f9fa-ba56-12e8-8e6d-589226eda530', 4, 'Scissors', false),
  ('d0b44e6c-bfb4-e3de-2fb5-c6e94e531f6a', 'a26cbc59-db73-7e0f-51d3-3546173f061e', 1, 'Eraser', true),
  ('d4ea783b-115f-f213-830f-d805913f20c1', 'a26cbc59-db73-7e0f-51d3-3546173f061e', 2, 'Pen', false),
  ('ea4c63ac-678a-2bbe-bca5-0b407f96803e', 'a26cbc59-db73-7e0f-51d3-3546173f061e', 3, 'Ruler', false),
  ('67388036-6ddc-d02c-656d-4fc8f9c346fc', 'a26cbc59-db73-7e0f-51d3-3546173f061e', 4, 'Board', false),
  ('972a03f9-cb7a-3892-e103-853cd729c73f', 'ebca7d7d-118e-2d8f-515f-603f888eab2f', 1, 'Classroom', false),
  ('a44abbfe-6e27-23ae-bc30-c5538a4d990f', 'ebca7d7d-118e-2d8f-515f-603f888eab2f', 2, 'Board', false),
  ('06ceca0f-d594-b752-d020-5e72edcc0214', 'ebca7d7d-118e-2d8f-515f-603f888eab2f', 3, 'Ruler', true),
  ('716af619-880b-9a9c-3fc1-732ffe85bb1e', 'ebca7d7d-118e-2d8f-515f-603f888eab2f', 4, 'Book', false),
  ('a498665f-a6bd-33d1-6cab-7c7a9ec4de2f', '754838bd-520f-b73a-846d-e3b4e5b955e0', 1, 'Paper', true),
  ('eebcc3b1-c388-f7d5-e597-c092eb4abb90', '754838bd-520f-b73a-846d-e3b4e5b955e0', 2, 'Notebook', false),
  ('6240b27c-fb57-52d6-0cf1-0fe85ff9a996', '754838bd-520f-b73a-846d-e3b4e5b955e0', 3, 'Board', false),
  ('9a0de42a-a22a-4b16-8cdd-a60c4b6547e8', '754838bd-520f-b73a-846d-e3b4e5b955e0', 4, 'Friend', false),
  ('26e53a8e-2a65-e7df-e028-588d036ac5a6', '3c18fbc6-075b-9b08-cd7d-da25296b5bd2', 1, 'Notebook', false),
  ('3d5d8ba5-4de8-1bbd-b4cd-dd0ec62b65e8', '3c18fbc6-075b-9b08-cd7d-da25296b5bd2', 2, 'Scissors', true),
  ('dd25848c-ef7c-d919-4181-71a393f508c6', '3c18fbc6-075b-9b08-cd7d-da25296b5bd2', 3, 'Board', false),
  ('f871a547-b9c0-7c66-1842-0eea808290ab', '3c18fbc6-075b-9b08-cd7d-da25296b5bd2', 4, 'Paper', false),
  ('7e790243-483f-7e68-980a-5fcd8acf2f78', 'e4887cfb-da44-80b9-8a69-347a76f540f4', 1, 'Book', true),
  ('2a1fea28-ba37-7349-d433-51d8cf69b777', 'e4887cfb-da44-80b9-8a69-347a76f540f4', 2, 'Paper', false),
  ('43e2353d-a97d-2c46-9769-f719f8c855fe', 'e4887cfb-da44-80b9-8a69-347a76f540f4', 3, 'Friend', false),
  ('19519964-a5e9-af22-90f4-3e43a13025c3', 'e4887cfb-da44-80b9-8a69-347a76f540f4', 4, 'Desk', false),
  ('e873ffc9-f960-dd71-912e-f279876c6a97', 'c585dab6-5a53-73a7-b5d8-236e6f0da23d', 1, 'Notebook', true),
  ('6be81c7b-8b84-03a0-06e0-5c020d786d50', 'c585dab6-5a53-73a7-b5d8-236e6f0da23d', 2, 'Bag', false),
  ('380997a9-65bb-99d1-b05e-a174664a0cc3', 'c585dab6-5a53-73a7-b5d8-236e6f0da23d', 3, 'Book', false),
  ('79c74ae6-edad-dab5-7be6-10533c0dbd0b', 'c585dab6-5a53-73a7-b5d8-236e6f0da23d', 4, 'Ruler', false);

insert into phases (id, track_id, number, title, format) values
  ('b8120147-7a58-72bd-00fc-8a0e2652c9ac', 'c7f1660a-2abb-1e41-0fc9-d6e48f6d9a97', 3, 'Compreender — parte 1', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('34c1aaa7-efeb-87fd-4eac-a4072c607ad3', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 'Leitor de Escola', 'Leu e compreendeu as palavras em inglês.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('aebabb98-56bb-f6e8-b606-d703be596130', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 1, 'word_meaning', 'Escola', 'School', null, null, 'school', 'School significa escola.', null),
  ('d489c322-1608-8c4b-b978-8d59c5a5cea2', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 2, 'word_meaning', 'Escola', 'Classroom', null, null, 'classroom', 'Classroom significa sala de aula.', null),
  ('f92f3a16-790e-abd0-b909-6f0fc35636f6', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 3, 'word_meaning', 'Escola', 'Teacher', null, null, 'teacher', 'Teacher significa professor.', null),
  ('2b111d9e-72db-bf77-d7b8-d39543dc3142', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 4, 'word_meaning', 'Escola', 'Student', null, null, 'student', 'Student significa aluno.', null),
  ('68c9c94a-36e3-b7f8-899a-a558c618e21a', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 5, 'word_meaning', 'Escola', 'Friend', null, null, 'friend', 'Friend significa amigo.', null),
  ('62299cfd-f9ea-a69b-3f83-dee1ad395c99', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 6, 'word_meaning', 'Escola', 'Desk', null, null, 'desk', 'Desk significa carteira.', null),
  ('900e2cc4-534b-854b-69b0-c65730ed11ac', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 7, 'word_meaning', 'Escola', 'Board', null, null, 'board', 'Board significa quadro.', null),
  ('76379f93-eeda-61d6-ee29-f093b910944b', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 8, 'word_meaning', 'Escola', 'Bag', null, null, 'bag', 'Bag significa mochila.', null),
  ('b2d8e2c9-0b6c-5b4d-d3dc-40ddcca1f315', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 9, 'word_meaning', 'Escola', 'School', null, null, 'school', 'School significa escola.', null),
  ('a61281ba-6a6d-9c0d-7043-257d3b125560', 'b8120147-7a58-72bd-00fc-8a0e2652c9ac', 10, 'word_meaning', 'Escola', 'Classroom', null, null, 'classroom', 'Classroom significa sala de aula.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('f56da13f-635e-f98d-6a63-2fc16a7abf30', 'aebabb98-56bb-f6e8-b606-d703be596130', 1, 'escola', true),
  ('adaaaa7c-e9f6-7140-a95a-1c28c537a345', 'aebabb98-56bb-f6e8-b606-d703be596130', 2, 'régua', false),
  ('9f08b105-2768-2d5c-f7cf-03a37876b087', 'aebabb98-56bb-f6e8-b606-d703be596130', 3, 'carteira', false),
  ('b118edb3-f3f7-5a5f-ac22-53a4b5d3c690', 'aebabb98-56bb-f6e8-b606-d703be596130', 4, 'amigo', false),
  ('0b622578-7c4c-9643-cb37-e4983ac83a46', 'd489c322-1608-8c4b-b978-8d59c5a5cea2', 1, 'professor', false),
  ('5a84979c-cd80-bb7c-e960-99b38a1966b8', 'd489c322-1608-8c4b-b978-8d59c5a5cea2', 2, 'borracha', false),
  ('c1fa20c3-c7af-164b-7490-27ed2225db06', 'd489c322-1608-8c4b-b978-8d59c5a5cea2', 3, 'livro', false),
  ('30aa070b-f1a0-d64d-4940-f23d603a1aeb', 'd489c322-1608-8c4b-b978-8d59c5a5cea2', 4, 'sala de aula', true),
  ('71063279-aeea-144d-1489-9ee09185118a', 'f92f3a16-790e-abd0-b909-6f0fc35636f6', 1, 'professor', true),
  ('be7af252-0254-8b1c-92c2-d1c407fe04b3', 'f92f3a16-790e-abd0-b909-6f0fc35636f6', 2, 'escola', false),
  ('79b76d25-5a3b-d4f9-7c9c-76ab030e2ad5', 'f92f3a16-790e-abd0-b909-6f0fc35636f6', 3, 'mochila', false),
  ('5c1d27f0-f371-88a1-f490-cadccd3ab3d8', 'f92f3a16-790e-abd0-b909-6f0fc35636f6', 4, 'tesoura', false),
  ('ed276b25-597b-b1a4-81ae-3f741c913c07', '2b111d9e-72db-bf77-d7b8-d39543dc3142', 1, 'aluno', true),
  ('0f7630f2-d3f4-3c04-46ba-6429c87d0975', '2b111d9e-72db-bf77-d7b8-d39543dc3142', 2, 'carteira', false),
  ('2e9d05f6-625e-6171-625e-67f5ad2b8744', '2b111d9e-72db-bf77-d7b8-d39543dc3142', 3, 'caneta', false),
  ('13904199-fedd-3b1e-5320-ecf60419a26b', '2b111d9e-72db-bf77-d7b8-d39543dc3142', 4, 'papel', false),
  ('de5346ac-2db5-25dd-7d67-6a3a2663a911', '68c9c94a-36e3-b7f8-899a-a558c618e21a', 1, 'amigo', true),
  ('f081409d-0823-0361-2ac8-64f2323a1e13', '68c9c94a-36e3-b7f8-899a-a558c618e21a', 2, 'livro', false),
  ('66230fa8-b6a1-e3d0-653e-36352993ed2e', '68c9c94a-36e3-b7f8-899a-a558c618e21a', 3, 'borracha', false),
  ('cd003f17-18cd-75d0-d330-1c86d17827ec', '68c9c94a-36e3-b7f8-899a-a558c618e21a', 4, 'caderno', false),
  ('4182a53b-2a6d-f016-1124-1efec67043bd', '62299cfd-f9ea-a69b-3f83-dee1ad395c99', 1, 'quadro', false),
  ('0e39313d-22c6-c87a-b049-c2346036b85f', '62299cfd-f9ea-a69b-3f83-dee1ad395c99', 2, 'livro', false),
  ('0c104603-4749-b15c-a5d7-1e8ce1806945', '62299cfd-f9ea-a69b-3f83-dee1ad395c99', 3, 'carteira', true),
  ('cc9f01aa-1b75-908b-3515-c9ee62038cbd', '62299cfd-f9ea-a69b-3f83-dee1ad395c99', 4, 'tesoura', false),
  ('0cc435aa-0167-7f85-5b61-e96b0e611dca', '900e2cc4-534b-854b-69b0-c65730ed11ac', 1, 'professor', false),
  ('fe89566c-c30a-976b-f685-c262fa841b8b', '900e2cc4-534b-854b-69b0-c65730ed11ac', 2, 'sala de aula', false),
  ('8cd350b6-eb3f-60d4-ad70-acdc5a34359b', '900e2cc4-534b-854b-69b0-c65730ed11ac', 3, 'caderno', false),
  ('ef7d7b1e-e80c-b640-1d04-7256fb827641', '900e2cc4-534b-854b-69b0-c65730ed11ac', 4, 'quadro', true),
  ('d89dfaaa-ba68-4e33-c480-a65f93bfab6c', '76379f93-eeda-61d6-ee29-f093b910944b', 1, 'tesoura', false),
  ('7dc6b31a-6d51-895a-de9b-08819b615eac', '76379f93-eeda-61d6-ee29-f093b910944b', 2, 'papel', false),
  ('7b48f2b9-3600-2757-02de-16b30dc9d5ab', '76379f93-eeda-61d6-ee29-f093b910944b', 3, 'sala de aula', false),
  ('d3d81b82-473d-3f97-3dc3-dbe257e46bab', '76379f93-eeda-61d6-ee29-f093b910944b', 4, 'mochila', true),
  ('1bb06360-cbf7-8d92-0d47-8f75f8dc8512', 'b2d8e2c9-0b6c-5b4d-d3dc-40ddcca1f315', 1, 'caderno', false),
  ('dfccc120-e3bc-777e-0be6-9e400e68e1b3', 'b2d8e2c9-0b6c-5b4d-d3dc-40ddcca1f315', 2, 'escola', true),
  ('d97d8690-8d71-485a-9cea-ce4159fa7bfd', 'b2d8e2c9-0b6c-5b4d-d3dc-40ddcca1f315', 3, 'aluno', false),
  ('d207adfe-6971-b0ec-29a0-4df0d12b28fe', 'b2d8e2c9-0b6c-5b4d-d3dc-40ddcca1f315', 4, 'caneta', false),
  ('3029e0be-45e3-d281-f72a-ab27c85b30fc', 'a61281ba-6a6d-9c0d-7043-257d3b125560', 1, 'borracha', false),
  ('63564eb5-4b82-0964-d942-9c83cc0e68bc', 'a61281ba-6a6d-9c0d-7043-257d3b125560', 2, 'aluno', false),
  ('bab243a9-3a91-f844-f975-a9f99d0858c6', 'a61281ba-6a6d-9c0d-7043-257d3b125560', 3, 'sala de aula', true),
  ('1ed2de86-d367-1152-0268-d445f3a3aa18', 'a61281ba-6a6d-9c0d-7043-257d3b125560', 4, 'caneta', false);

insert into phases (id, track_id, number, title, format) values
  ('e9b411c5-0d9e-0893-b340-1f31892bfa64', 'c7f1660a-2abb-1e41-0fc9-d6e48f6d9a97', 4, 'Compreender — parte 2', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('f821520c-b045-5e9d-b1d8-183a5676583e', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 'Mestre de Escola', 'Dominou o vocabulário da trilha.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('56486d28-7142-b2b3-5fdc-7b90565283c2', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 1, 'word_meaning', 'Escola', 'Book', null, null, 'book', 'Book significa livro.', null),
  ('ab84629d-63cb-79e7-28e8-c7fcfa5f23ca', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 2, 'word_meaning', 'Escola', 'Notebook', null, null, 'notebook', 'Notebook significa caderno.', null),
  ('8a0b15e9-c5c5-b4db-da5e-f78c0e71668f', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 3, 'word_meaning', 'Escola', 'Pen', null, null, 'pen', 'Pen significa caneta.', null),
  ('732896e5-f556-efd1-2b4e-de4b2edca841', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 4, 'word_meaning', 'Escola', 'Pencil', null, null, 'pencil', 'Pencil significa lápis.', null),
  ('a640b75c-f7f1-0f22-ea8a-7d94e6262990', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 5, 'word_meaning', 'Escola', 'Eraser', null, null, 'eraser', 'Eraser significa borracha.', null),
  ('fc321b24-31d2-0c2b-c729-64b3600051e2', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 6, 'word_meaning', 'Escola', 'Ruler', null, null, 'ruler', 'Ruler significa régua.', null),
  ('91123384-b00c-b28f-095b-dfe2f23593e3', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 7, 'word_meaning', 'Escola', 'Paper', null, null, 'paper', 'Paper significa papel.', null),
  ('5201b46d-e61e-2006-87bf-35f3c88566a6', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 8, 'word_meaning', 'Escola', 'Scissors', null, null, 'scissors', 'Scissors significa tesoura.', null),
  ('542fc184-2670-a6e1-784c-defce051f3cd', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 9, 'word_meaning', 'Escola', 'Book', null, null, 'book', 'Book significa livro.', null),
  ('c30f0837-6ae5-cbc7-a0a6-d255afe20b81', 'e9b411c5-0d9e-0893-b340-1f31892bfa64', 10, 'word_meaning', 'Escola', 'Notebook', null, null, 'notebook', 'Notebook significa caderno.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('a5517617-4cb6-3f20-9d43-615767f1a293', '56486d28-7142-b2b3-5fdc-7b90565283c2', 1, 'mochila', false),
  ('6ce7160a-ce81-c83d-a0b0-5ae126d15a8e', '56486d28-7142-b2b3-5fdc-7b90565283c2', 2, 'quadro', false),
  ('47005c00-2c6f-a42b-dc70-3d563a358de6', '56486d28-7142-b2b3-5fdc-7b90565283c2', 3, 'livro', true),
  ('2285e5ca-6f07-737d-e4a6-06398caba38f', '56486d28-7142-b2b3-5fdc-7b90565283c2', 4, 'aluno', false),
  ('ec4cbf00-fa05-9485-6049-793bd20d2911', 'ab84629d-63cb-79e7-28e8-c7fcfa5f23ca', 1, 'papel', false),
  ('8a02cfd6-cab1-aa72-d2bc-9abe3cb52683', 'ab84629d-63cb-79e7-28e8-c7fcfa5f23ca', 2, 'caderno', true),
  ('d143572c-b175-1b3e-9ba2-cecd4db61756', 'ab84629d-63cb-79e7-28e8-c7fcfa5f23ca', 3, 'tesoura', false),
  ('787af898-bb38-31ae-6488-f7586fb818d2', 'ab84629d-63cb-79e7-28e8-c7fcfa5f23ca', 4, 'quadro', false),
  ('e408d0a2-01be-e311-2378-97b9fdafaddc', '8a0b15e9-c5c5-b4db-da5e-f78c0e71668f', 1, 'régua', false),
  ('359b295c-2693-58fc-dd31-9282eeb5cf75', '8a0b15e9-c5c5-b4db-da5e-f78c0e71668f', 2, 'caneta', true),
  ('68a89de7-a6ac-a08c-9e94-1333899b952c', '8a0b15e9-c5c5-b4db-da5e-f78c0e71668f', 3, 'sala de aula', false),
  ('8edcc2da-b81b-119c-0c58-c6736747b4a1', '8a0b15e9-c5c5-b4db-da5e-f78c0e71668f', 4, 'mochila', false),
  ('5b8438f6-f34c-55c9-1b9a-9cd9972442d2', '732896e5-f556-efd1-2b4e-de4b2edca841', 1, 'lápis', true),
  ('f7924468-0a4a-15b2-97cf-49441ad921df', '732896e5-f556-efd1-2b4e-de4b2edca841', 2, 'caderno', false),
  ('59a1b1c7-e31a-9df7-2a5e-85b40a8312f7', '732896e5-f556-efd1-2b4e-de4b2edca841', 3, 'professor', false),
  ('92688212-3822-78c5-2a90-57051401599a', '732896e5-f556-efd1-2b4e-de4b2edca841', 4, 'sala de aula', false),
  ('bfa61037-ec06-f281-0c7f-dea84c372bce', 'a640b75c-f7f1-0f22-ea8a-7d94e6262990', 1, 'livro', false),
  ('1433dcb8-8ae2-7579-62df-f125cc8dda30', 'a640b75c-f7f1-0f22-ea8a-7d94e6262990', 2, 'papel', false),
  ('c3793c61-8272-9124-1a7c-153a159e8f80', 'a640b75c-f7f1-0f22-ea8a-7d94e6262990', 3, 'aluno', false),
  ('2bebddba-6430-6c17-8bec-832cf2533417', 'a640b75c-f7f1-0f22-ea8a-7d94e6262990', 4, 'borracha', true),
  ('535020e5-70e3-62e9-fbf1-b2bc0b0d004f', 'fc321b24-31d2-0c2b-c729-64b3600051e2', 1, 'borracha', false),
  ('38293d45-a9a6-86c2-9338-b739ee41a7a0', 'fc321b24-31d2-0c2b-c729-64b3600051e2', 2, 'lápis', false),
  ('64ad93a0-b355-1e51-2dd6-8a71a0da69b7', 'fc321b24-31d2-0c2b-c729-64b3600051e2', 3, 'carteira', false),
  ('36db8152-b9e9-d742-c1ca-af2f9bf4a1db', 'fc321b24-31d2-0c2b-c729-64b3600051e2', 4, 'régua', true),
  ('f0b91ba6-42b5-53e8-2109-87351cfc2703', '91123384-b00c-b28f-095b-dfe2f23593e3', 1, 'caneta', false),
  ('b14d40cc-892d-161c-3053-ab8714a1ede7', '91123384-b00c-b28f-095b-dfe2f23593e3', 2, 'amigo', false),
  ('94e5790f-37bb-66e4-35f8-decf937b7de8', '91123384-b00c-b28f-095b-dfe2f23593e3', 3, 'papel', true),
  ('1f8a7a60-0d70-d361-1c61-01964f4e659b', '91123384-b00c-b28f-095b-dfe2f23593e3', 4, 'livro', false),
  ('2d300af4-83c9-5ff4-1bb3-49b61e67d471', '5201b46d-e61e-2006-87bf-35f3c88566a6', 1, 'amigo', false),
  ('ac125d27-7060-2336-7e5a-94dd3bc5d63c', '5201b46d-e61e-2006-87bf-35f3c88566a6', 2, 'tesoura', true),
  ('768ff623-5ac2-d3fb-3645-293cd67d9e2e', '5201b46d-e61e-2006-87bf-35f3c88566a6', 3, 'lápis', false),
  ('88e2b7e4-d329-a4ac-8bbb-06d2edbe2d9d', '5201b46d-e61e-2006-87bf-35f3c88566a6', 4, 'caneta', false),
  ('04e15839-58ec-dc7a-adf0-3fc728cc4723', '542fc184-2670-a6e1-784c-defce051f3cd', 1, 'professor', false),
  ('e9b41496-b015-3d9b-87f6-606f35f49f7a', '542fc184-2670-a6e1-784c-defce051f3cd', 2, 'escola', false),
  ('aa7c45f8-5f86-874f-0d14-eee60ea6020f', '542fc184-2670-a6e1-784c-defce051f3cd', 3, 'régua', false),
  ('ba7e2ba3-14bf-f02e-2600-df7c1eacf439', '542fc184-2670-a6e1-784c-defce051f3cd', 4, 'livro', true),
  ('343c7251-aa66-9861-f980-e33255710108', 'c30f0837-6ae5-cbc7-a0a6-d255afe20b81', 1, 'papel', false),
  ('0cbc9e0d-3252-ccb8-55f2-92ba2150a4f2', 'c30f0837-6ae5-cbc7-a0a6-d255afe20b81', 2, 'escola', false),
  ('a6829d7d-1550-c7ae-1864-497693c60a66', 'c30f0837-6ae5-cbc7-a0a6-d255afe20b81', 3, 'caderno', true),
  ('4cc97193-8f3e-dda0-ff5d-1bcd1e733ca8', 'c30f0837-6ae5-cbc7-a0a6-d255afe20b81', 4, 'livro', false);

-- Animais
insert into tracks (id, slug, title, band, position) values
  ('d037b5a1-67a0-0b76-a4c1-ce3614b6e220', 'animais', 'Animais', '1-2', 3);

insert into phases (id, track_id, number, title, format) values
  ('21928fb6-0528-e58a-5cb7-780a919448ab', 'd037b5a1-67a0-0b76-a4c1-ce3614b6e220', 1, 'Reconhecer — parte 1', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('68fbe947-1bd8-5cd2-1fd8-b5e4cfbd4d28', '21928fb6-0528-e58a-5cb7-780a919448ab', 'Descobridor de Animais', 'Reconheceu as primeiras palavras pela imagem.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('f59d0dd2-a34b-d706-17e1-2fc2c116a66e', '21928fb6-0528-e58a-5cb7-780a919448ab', 1, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/dog.webp', 'dog', 'Dog significa cachorro.', null),
  ('14486de4-8788-d579-8e8b-7931e0f4f086', '21928fb6-0528-e58a-5cb7-780a919448ab', 2, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/cat.webp', 'cat', 'Cat significa gato.', null),
  ('d491f545-0df1-c48e-b725-d4675c859b58', '21928fb6-0528-e58a-5cb7-780a919448ab', 3, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/bird.webp', 'bird', 'Bird significa pássaro.', null),
  ('d250555b-c5ac-101c-0a04-e3399f48abdd', '21928fb6-0528-e58a-5cb7-780a919448ab', 4, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/fish.webp', 'fish', 'Fish significa peixe.', null),
  ('0b3f5145-5a8d-87cf-0215-abdf55deb684', '21928fb6-0528-e58a-5cb7-780a919448ab', 5, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/cow.webp', 'cow', 'Cow significa vaca.', null),
  ('b598d3b7-4a3f-bfdc-f9ad-55284757e59a', '21928fb6-0528-e58a-5cb7-780a919448ab', 6, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/horse.webp', 'horse', 'Horse significa cavalo.', null),
  ('28720c37-53e4-a976-1896-2b9f15de639b', '21928fb6-0528-e58a-5cb7-780a919448ab', 7, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/pig.webp', 'pig', 'Pig significa porco.', null),
  ('e3562a66-52d8-03a0-5613-a0065f659f03', '21928fb6-0528-e58a-5cb7-780a919448ab', 8, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/duck.webp', 'duck', 'Duck significa pato.', null),
  ('036fa1c2-be65-e15a-c087-5ea66e06c072', '21928fb6-0528-e58a-5cb7-780a919448ab', 9, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/dog.webp', 'dog', 'Dog significa cachorro.', null),
  ('41da4c5d-b047-7bf3-0d71-4dfb7f760fe1', '21928fb6-0528-e58a-5cb7-780a919448ab', 10, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/cat.webp', 'cat', 'Cat significa gato.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('c6f26c71-f2d8-acc2-2f29-a8d0d8ce9997', 'f59d0dd2-a34b-d706-17e1-2fc2c116a66e', 1, 'Cow', false),
  ('4cb8f1e3-6760-3c75-2a4d-f6935b20e18a', 'f59d0dd2-a34b-d706-17e1-2fc2c116a66e', 2, 'Ant', false),
  ('3abfb147-50b3-1609-f398-debc26b07dd3', 'f59d0dd2-a34b-d706-17e1-2fc2c116a66e', 3, 'Dog', true),
  ('dcc5054d-4e65-81c1-628c-50689003e74e', 'f59d0dd2-a34b-d706-17e1-2fc2c116a66e', 4, 'Horse', false),
  ('850d7db2-d855-2b3f-f109-a2a4de88a61a', '14486de4-8788-d579-8e8b-7931e0f4f086', 1, 'Turtle', false),
  ('9c85a8fa-935f-80dd-e071-fc2a613f5fd7', '14486de4-8788-d579-8e8b-7931e0f4f086', 2, 'Cat', true),
  ('27913b91-86e8-3ce1-9d57-41dd1e4a5a51', '14486de4-8788-d579-8e8b-7931e0f4f086', 3, 'Ant', false),
  ('4a7ffd01-4abc-839a-c5f3-f2d8651bd537', '14486de4-8788-d579-8e8b-7931e0f4f086', 4, 'Frog', false),
  ('600b50bb-6b50-0b7b-5234-111420f303e8', 'd491f545-0df1-c48e-b725-d4675c859b58', 1, 'Horse', false),
  ('66e95903-5c77-9e05-9469-18ed39006be9', 'd491f545-0df1-c48e-b725-d4675c859b58', 2, 'Sheep', false),
  ('78a21e0d-ac0b-d71d-0c35-50d5dfbe8127', 'd491f545-0df1-c48e-b725-d4675c859b58', 3, 'Bird', true),
  ('5f8007e6-fa8e-a080-628c-63e7c397dd5e', 'd491f545-0df1-c48e-b725-d4675c859b58', 4, 'Cat', false),
  ('4aa14701-c6dd-707d-acb2-f55822ab067d', 'd250555b-c5ac-101c-0a04-e3399f48abdd', 1, 'Fish', true),
  ('f3594aa3-a0b6-d828-e086-a48ded810c63', 'd250555b-c5ac-101c-0a04-e3399f48abdd', 2, 'Rabbit', false),
  ('210e4dce-29cf-be62-833b-9b5950cd8e8e', 'd250555b-c5ac-101c-0a04-e3399f48abdd', 3, 'Horse', false),
  ('3b1f2f49-4204-b895-36fc-21e47483ea95', 'd250555b-c5ac-101c-0a04-e3399f48abdd', 4, 'Dog', false),
  ('1e81098c-6a0d-08c1-3e86-f86e99e8bdd5', '0b3f5145-5a8d-87cf-0215-abdf55deb684', 1, 'Sheep', false),
  ('fd8c9593-e18b-f3d5-6504-b6f0aad09327', '0b3f5145-5a8d-87cf-0215-abdf55deb684', 2, 'Cat', false),
  ('f8577966-3955-58d6-245f-03f24782e718', '0b3f5145-5a8d-87cf-0215-abdf55deb684', 3, 'Cow', true),
  ('f5694a6d-b91a-69e2-23f0-80abb430619e', '0b3f5145-5a8d-87cf-0215-abdf55deb684', 4, 'Ant', false),
  ('56c6eef2-c878-ee1d-0951-a05ba52a3d84', 'b598d3b7-4a3f-bfdc-f9ad-55284757e59a', 1, 'Turtle', false),
  ('6f0ae64c-631a-670a-a3f1-73f6269c4c6c', 'b598d3b7-4a3f-bfdc-f9ad-55284757e59a', 2, 'Ant', false),
  ('807293af-64d7-af49-95d0-b1cbcfd8e9f7', 'b598d3b7-4a3f-bfdc-f9ad-55284757e59a', 3, 'Frog', false),
  ('a51d637f-bdc6-8354-75e9-c16e43ba4955', 'b598d3b7-4a3f-bfdc-f9ad-55284757e59a', 4, 'Horse', true),
  ('2a78cdf4-d48c-afd1-1ece-dffbefca5426', '28720c37-53e4-a976-1896-2b9f15de639b', 1, 'Duck', false),
  ('cbf85626-1295-9d4d-76c1-2521f8cf00d4', '28720c37-53e4-a976-1896-2b9f15de639b', 2, 'Mouse', false),
  ('5830a846-c10a-ccfd-9b5e-6cd3c77bd73e', '28720c37-53e4-a976-1896-2b9f15de639b', 3, 'Turtle', false),
  ('2a8e73b2-aaf4-aaeb-d93d-7c57584f2f86', '28720c37-53e4-a976-1896-2b9f15de639b', 4, 'Pig', true),
  ('ce90ce26-1a77-d0dd-b8e7-70c0f6bbd759', 'e3562a66-52d8-03a0-5613-a0065f659f03', 1, 'Cow', false),
  ('7418b7c9-ee17-4862-186a-4bbd37eac537', 'e3562a66-52d8-03a0-5613-a0065f659f03', 2, 'Duck', true),
  ('747b89f0-096b-daf9-df2f-438bc36ff70a', 'e3562a66-52d8-03a0-5613-a0065f659f03', 3, 'Bird', false),
  ('37500671-fc67-af3d-391f-f4e5925f8280', 'e3562a66-52d8-03a0-5613-a0065f659f03', 4, 'Mouse', false),
  ('c3554003-13e4-31e2-0f57-9a3119c76db6', '036fa1c2-be65-e15a-c087-5ea66e06c072', 1, 'Turtle', false),
  ('1a2dc240-4177-8881-460d-098e4e7dfc35', '036fa1c2-be65-e15a-c087-5ea66e06c072', 2, 'Duck', false),
  ('d915ba73-6a7e-f8c3-57ba-b31fdbc81f14', '036fa1c2-be65-e15a-c087-5ea66e06c072', 3, 'Sheep', false),
  ('8e596a1c-7e6b-da20-4041-1d581d46661f', '036fa1c2-be65-e15a-c087-5ea66e06c072', 4, 'Dog', true),
  ('5be8a3ae-a678-df67-1168-3e245e30bfe9', '41da4c5d-b047-7bf3-0d71-4dfb7f760fe1', 1, 'Turtle', false),
  ('0d91e45d-77a7-ec2e-2504-fe248c8d1742', '41da4c5d-b047-7bf3-0d71-4dfb7f760fe1', 2, 'Cow', false),
  ('bb91f2fa-d31a-7229-eeed-c153dfcff3ba', '41da4c5d-b047-7bf3-0d71-4dfb7f760fe1', 3, 'Cat', true),
  ('c07ec354-ac40-db1e-25fb-1f2e67ee1436', '41da4c5d-b047-7bf3-0d71-4dfb7f760fe1', 4, 'Frog', false);

insert into phases (id, track_id, number, title, format) values
  ('6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 'd037b5a1-67a0-0b76-a4c1-ce3614b6e220', 2, 'Reconhecer — parte 2', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('1a7a80f1-f2f8-51dc-47fd-05896d5542dc', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 'Explorador de Animais', 'Reconheceu o segundo bloco de palavras.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('73a2acbb-818a-cbbb-6d5d-240956c68773', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 1, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/rabbit.webp', 'rabbit', 'Rabbit significa coelho.', null),
  ('ff945e04-4430-d822-08d6-b5dd7c88940b', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 2, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/mouse.webp', 'mouse', 'Mouse significa rato.', null),
  ('f0eacabd-09fe-5f05-7b16-0f463101e343', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 3, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/sheep.webp', 'sheep', 'Sheep significa ovelha.', null),
  ('8801498c-44ce-a4fa-df26-4ebd0beadb78', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 4, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/frog.webp', 'frog', 'Frog significa sapo.', null),
  ('992bbf9f-6b75-35a6-d7fb-feaf0abe5062', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 5, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/bee.webp', 'bee', 'Bee significa abelha.', null),
  ('f28ae624-de43-74e6-885a-1adca0c2a805', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 6, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/ant.webp', 'ant', 'Ant significa formiga.', null),
  ('85733693-4bbf-8d46-b836-74c6a0db46b5', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 7, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/butterfly.webp', 'butterfly', 'Butterfly significa borboleta.', null),
  ('34663e47-48cf-d9bd-0eec-d0b67f4272c0', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 8, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/turtle.webp', 'turtle', 'Turtle significa tartaruga.', null),
  ('68293d8e-92b2-b183-5ab8-b8564c15be39', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 9, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/rabbit.webp', 'rabbit', 'Rabbit significa coelho.', null),
  ('ecd91f88-520f-3177-f598-d5b79d8abdd7', '6ed4e672-f8ca-415a-a466-4fa0542f5ed5', 10, 'image_word', 'Animais', 'What is this?', 'O que é isto?', '/quiz/mouse.webp', 'mouse', 'Mouse significa rato.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('3b970cbc-91c2-e9e8-f591-23e35c4706c6', '73a2acbb-818a-cbbb-6d5d-240956c68773', 1, 'Duck', false),
  ('0880e5c2-df3d-1732-1473-ecb97d3b0222', '73a2acbb-818a-cbbb-6d5d-240956c68773', 2, 'Rabbit', true),
  ('7cb689e0-9264-2479-f34e-bb6e482c5e76', '73a2acbb-818a-cbbb-6d5d-240956c68773', 3, 'Turtle', false),
  ('98dbc913-c49e-6d6d-14c8-6d4406c2972d', '73a2acbb-818a-cbbb-6d5d-240956c68773', 4, 'Sheep', false),
  ('726db565-2095-b76f-b265-2d875b72a0b2', 'ff945e04-4430-d822-08d6-b5dd7c88940b', 1, 'Cow', false),
  ('b96956ba-220a-d306-e29c-ed415ba02ee6', 'ff945e04-4430-d822-08d6-b5dd7c88940b', 2, 'Ant', false),
  ('55b873d2-f6ea-337e-af87-8d68d42058f9', 'ff945e04-4430-d822-08d6-b5dd7c88940b', 3, 'Bee', false),
  ('c0783a7a-48a4-c225-dc4f-27ffed440059', 'ff945e04-4430-d822-08d6-b5dd7c88940b', 4, 'Mouse', true),
  ('b03fa3f1-bea2-5984-d52a-501493aa93c5', 'f0eacabd-09fe-5f05-7b16-0f463101e343', 1, 'Bird', false),
  ('db5365c1-c34f-27f5-f3ae-bb78e37a4cac', 'f0eacabd-09fe-5f05-7b16-0f463101e343', 2, 'Cat', false),
  ('5c5c3752-70a4-4979-6435-50824d3bc8b0', 'f0eacabd-09fe-5f05-7b16-0f463101e343', 3, 'Sheep', true),
  ('e6a6c05b-0e2b-f654-af4f-92d1d77e9510', 'f0eacabd-09fe-5f05-7b16-0f463101e343', 4, 'Rabbit', false),
  ('ca5adf5a-6b39-ddfb-d1af-796a854202f6', '8801498c-44ce-a4fa-df26-4ebd0beadb78', 1, 'Frog', true),
  ('e5ab6d33-11bd-1963-bfc0-b42689390ffb', '8801498c-44ce-a4fa-df26-4ebd0beadb78', 2, 'Dog', false),
  ('10fcdd69-fc46-27cd-8e02-fa3e2951541f', '8801498c-44ce-a4fa-df26-4ebd0beadb78', 3, 'Bird', false),
  ('e2d14c4c-9994-344d-97ba-60337c8e3539', '8801498c-44ce-a4fa-df26-4ebd0beadb78', 4, 'Cat', false),
  ('676c897d-8e78-a408-86f4-cb5d71371cf6', '992bbf9f-6b75-35a6-d7fb-feaf0abe5062', 1, 'Rabbit', false),
  ('ddde47ac-4cee-62e1-6045-4314fededb57', '992bbf9f-6b75-35a6-d7fb-feaf0abe5062', 2, 'Cow', false),
  ('9bac6a78-ac76-1a2e-7801-3351b56ff812', '992bbf9f-6b75-35a6-d7fb-feaf0abe5062', 3, 'Bee', true),
  ('a482b644-92e4-863c-a7f4-21a54637be69', '992bbf9f-6b75-35a6-d7fb-feaf0abe5062', 4, 'Bird', false),
  ('1669f0e6-956b-89f7-061f-a42d62e5773a', 'f28ae624-de43-74e6-885a-1adca0c2a805', 1, 'Ant', true),
  ('cd1f6546-82af-eeef-b49a-5c2613695112', 'f28ae624-de43-74e6-885a-1adca0c2a805', 2, 'Frog', false),
  ('38fdcf77-2542-5c7a-260c-bfb8212406cb', 'f28ae624-de43-74e6-885a-1adca0c2a805', 3, 'Bird', false),
  ('d978fc37-4fdc-e8f7-a6fe-2080dcd4de80', 'f28ae624-de43-74e6-885a-1adca0c2a805', 4, 'Dog', false),
  ('e7ae8d5d-f6c3-9c4d-8fcf-4dc5bfc10434', '85733693-4bbf-8d46-b836-74c6a0db46b5', 1, 'Dog', false),
  ('cc665d62-b040-aeec-950b-5f60a426e3e3', '85733693-4bbf-8d46-b836-74c6a0db46b5', 2, 'Bee', false),
  ('f757a062-6598-2d15-5b5c-06da2d37f074', '85733693-4bbf-8d46-b836-74c6a0db46b5', 3, 'Mouse', false),
  ('93a11ebf-b859-995a-74ac-b1d9df243b44', '85733693-4bbf-8d46-b836-74c6a0db46b5', 4, 'Butterfly', true),
  ('c03ca249-80b4-f055-7823-1ae3031c5a75', '34663e47-48cf-d9bd-0eec-d0b67f4272c0', 1, 'Turtle', true),
  ('b3938be7-3873-29e5-2267-488462108021', '34663e47-48cf-d9bd-0eec-d0b67f4272c0', 2, 'Ant', false),
  ('83196ed5-48e2-b083-3f99-a601115698c5', '34663e47-48cf-d9bd-0eec-d0b67f4272c0', 3, 'Frog', false),
  ('2e36d92a-cffa-62d9-3148-2b2190cde8f9', '34663e47-48cf-d9bd-0eec-d0b67f4272c0', 4, 'Pig', false),
  ('83fadd20-286d-4a57-ca1e-7f58cc3b9e5f', '68293d8e-92b2-b183-5ab8-b8564c15be39', 1, 'Cow', false),
  ('ba00b0bd-5d5a-225f-b4fc-98f289d3a9d7', '68293d8e-92b2-b183-5ab8-b8564c15be39', 2, 'Mouse', false),
  ('77d83e93-dc88-aeaa-605a-dd998dfa095e', '68293d8e-92b2-b183-5ab8-b8564c15be39', 3, 'Frog', false),
  ('8df9d25e-2e1a-0e1d-27d8-52952539dce6', '68293d8e-92b2-b183-5ab8-b8564c15be39', 4, 'Rabbit', true),
  ('9117d2a6-d2ff-6af8-e0cd-92ef78d1eb8c', 'ecd91f88-520f-3177-f598-d5b79d8abdd7', 1, 'Bird', false),
  ('d1f16820-3432-f3f0-97de-a72f8649d4ae', 'ecd91f88-520f-3177-f598-d5b79d8abdd7', 2, 'Duck', false),
  ('f306de55-e2fe-7a0b-c0d7-e64bb59f6b24', 'ecd91f88-520f-3177-f598-d5b79d8abdd7', 3, 'Mouse', true),
  ('ec67163d-5901-5275-fb33-86f9ece94f0f', 'ecd91f88-520f-3177-f598-d5b79d8abdd7', 4, 'Frog', false);

insert into phases (id, track_id, number, title, format) values
  ('da17f406-c112-c3e7-f574-400bf1e73a90', 'd037b5a1-67a0-0b76-a4c1-ce3614b6e220', 3, 'Compreender — parte 1', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('80043406-974e-0053-e391-c09b9b6f2ace', 'da17f406-c112-c3e7-f574-400bf1e73a90', 'Leitor de Animais', 'Leu e compreendeu as palavras em inglês.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('09bdb660-9e80-eb2b-94f6-87d16dba9b3f', 'da17f406-c112-c3e7-f574-400bf1e73a90', 1, 'word_meaning', 'Animais', 'Dog', null, null, 'dog', 'Dog significa cachorro.', null),
  ('085098b1-7b70-aa30-8d49-8fcdc99dd6bb', 'da17f406-c112-c3e7-f574-400bf1e73a90', 2, 'word_meaning', 'Animais', 'Cat', null, null, 'cat', 'Cat significa gato.', null),
  ('21dabd6c-e4ad-b803-8b26-17b934fba2c6', 'da17f406-c112-c3e7-f574-400bf1e73a90', 3, 'word_meaning', 'Animais', 'Bird', null, null, 'bird', 'Bird significa pássaro.', null),
  ('b4454e9d-b305-1c22-547c-ce4979c078b5', 'da17f406-c112-c3e7-f574-400bf1e73a90', 4, 'word_meaning', 'Animais', 'Fish', null, null, 'fish', 'Fish significa peixe.', null),
  ('ed25c312-f999-04a7-3386-f200b9e22ed7', 'da17f406-c112-c3e7-f574-400bf1e73a90', 5, 'word_meaning', 'Animais', 'Cow', null, null, 'cow', 'Cow significa vaca.', null),
  ('e53a3bba-acaa-3a1c-ef91-c5a198a72d9f', 'da17f406-c112-c3e7-f574-400bf1e73a90', 6, 'word_meaning', 'Animais', 'Horse', null, null, 'horse', 'Horse significa cavalo.', null),
  ('dcf7649c-9c59-c3ba-95a8-421bf39e6f65', 'da17f406-c112-c3e7-f574-400bf1e73a90', 7, 'word_meaning', 'Animais', 'Pig', null, null, 'pig', 'Pig significa porco.', null),
  ('2223ef1c-ebfe-9e6b-2759-99755952cd53', 'da17f406-c112-c3e7-f574-400bf1e73a90', 8, 'word_meaning', 'Animais', 'Duck', null, null, 'duck', 'Duck significa pato.', null),
  ('822b6a27-3050-ed0f-617a-4f3f3a529775', 'da17f406-c112-c3e7-f574-400bf1e73a90', 9, 'word_meaning', 'Animais', 'Dog', null, null, 'dog', 'Dog significa cachorro.', null),
  ('1ac6488b-4a94-88cf-5bb8-67ce97270d54', 'da17f406-c112-c3e7-f574-400bf1e73a90', 10, 'word_meaning', 'Animais', 'Cat', null, null, 'cat', 'Cat significa gato.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('d536531c-fe63-3e99-6e20-60a6d188150b', '09bdb660-9e80-eb2b-94f6-87d16dba9b3f', 1, 'formiga', false),
  ('daddd760-1791-efc3-d780-722b09aa789f', '09bdb660-9e80-eb2b-94f6-87d16dba9b3f', 2, 'cachorro', true),
  ('bbde5e39-0369-366d-9ffb-f0c59ef36a2a', '09bdb660-9e80-eb2b-94f6-87d16dba9b3f', 3, 'tartaruga', false),
  ('90fb0973-ca2c-47a7-0120-1da6dd799f00', '09bdb660-9e80-eb2b-94f6-87d16dba9b3f', 4, 'peixe', false),
  ('efa13c9f-89d4-8a29-6ff9-f88a94e7e372', '085098b1-7b70-aa30-8d49-8fcdc99dd6bb', 1, 'tartaruga', false),
  ('b3701c36-af93-4e13-8823-492abfaf0384', '085098b1-7b70-aa30-8d49-8fcdc99dd6bb', 2, 'cachorro', false),
  ('cab02d25-5d0e-5bd0-78a0-34b023c5d10a', '085098b1-7b70-aa30-8d49-8fcdc99dd6bb', 3, 'vaca', false),
  ('2234db6b-e4b5-669d-a8bd-cc4cf230cf77', '085098b1-7b70-aa30-8d49-8fcdc99dd6bb', 4, 'gato', true),
  ('f55a0b0e-7a5e-fa73-ece7-8e16edaf8ca9', '21dabd6c-e4ad-b803-8b26-17b934fba2c6', 1, 'pássaro', true),
  ('9a65bd6f-7de7-24bd-da80-69397a39bfc9', '21dabd6c-e4ad-b803-8b26-17b934fba2c6', 2, 'peixe', false),
  ('4710823b-d3f3-45bf-1010-a103841befbf', '21dabd6c-e4ad-b803-8b26-17b934fba2c6', 3, 'coelho', false),
  ('fa0787d4-f1ad-bc80-5fed-16695ba9b65b', '21dabd6c-e4ad-b803-8b26-17b934fba2c6', 4, 'abelha', false),
  ('65418b43-5f02-76bd-d295-bf217b2e24a7', 'b4454e9d-b305-1c22-547c-ce4979c078b5', 1, 'borboleta', false),
  ('26b6dd01-77ac-ec96-2a36-846043f1b3e7', 'b4454e9d-b305-1c22-547c-ce4979c078b5', 2, 'peixe', true),
  ('2dad7a17-ba36-8143-bd4c-2ed1a523d393', 'b4454e9d-b305-1c22-547c-ce4979c078b5', 3, 'coelho', false),
  ('3651ef08-43e4-b158-0a2c-9b18b457ba76', 'b4454e9d-b305-1c22-547c-ce4979c078b5', 4, 'cachorro', false),
  ('081734df-782f-f257-9b40-17ba02308c1e', 'ed25c312-f999-04a7-3386-f200b9e22ed7', 1, 'vaca', true),
  ('e76c4b98-3b6f-9bb8-906f-b7f2363d65eb', 'ed25c312-f999-04a7-3386-f200b9e22ed7', 2, 'pato', false),
  ('386580fd-da2c-0b70-7c3f-e760f89f2641', 'ed25c312-f999-04a7-3386-f200b9e22ed7', 3, 'peixe', false),
  ('a307dab4-07a0-b2b7-b4e1-11dc879fc768', 'ed25c312-f999-04a7-3386-f200b9e22ed7', 4, 'borboleta', false),
  ('516b0807-99ea-3c86-3736-b2349e083d8c', 'e53a3bba-acaa-3a1c-ef91-c5a198a72d9f', 1, 'cavalo', true),
  ('d203d123-c5ae-6aaf-fdaa-5a2a5779e996', 'e53a3bba-acaa-3a1c-ef91-c5a198a72d9f', 2, 'tartaruga', false),
  ('326a6073-5c90-a9ee-a3ab-7d1da21990d2', 'e53a3bba-acaa-3a1c-ef91-c5a198a72d9f', 3, 'pássaro', false),
  ('c2c3e8a8-6913-c478-01c9-69e51c3ac57e', 'e53a3bba-acaa-3a1c-ef91-c5a198a72d9f', 4, 'sapo', false),
  ('4a8b2c70-f69c-b0d2-e700-bd39cef8bf31', 'dcf7649c-9c59-c3ba-95a8-421bf39e6f65', 1, 'sapo', false),
  ('560c976d-e501-b38f-f7c7-4b577b650ea9', 'dcf7649c-9c59-c3ba-95a8-421bf39e6f65', 2, 'porco', true),
  ('34b7df05-c4bf-b5e5-bb32-99c9e33661fe', 'dcf7649c-9c59-c3ba-95a8-421bf39e6f65', 3, 'abelha', false),
  ('4cb9bb6d-5ca5-dd51-d357-968aa726889b', 'dcf7649c-9c59-c3ba-95a8-421bf39e6f65', 4, 'tartaruga', false),
  ('92958221-bff3-0ef2-bd1b-b66bbd5188e5', '2223ef1c-ebfe-9e6b-2759-99755952cd53', 1, 'borboleta', false),
  ('107f5399-68eb-6cc0-42c5-37833af3560b', '2223ef1c-ebfe-9e6b-2759-99755952cd53', 2, 'pato', true),
  ('2aee7cbe-7110-aeab-01ac-b0ec862b0c59', '2223ef1c-ebfe-9e6b-2759-99755952cd53', 3, 'pássaro', false),
  ('90dba91e-31fa-ce3b-0ff2-5d5c293931f7', '2223ef1c-ebfe-9e6b-2759-99755952cd53', 4, 'sapo', false),
  ('e7c31f71-9149-b9ac-6ac1-15c0364d2937', '822b6a27-3050-ed0f-617a-4f3f3a529775', 1, 'cachorro', true),
  ('bf68313b-f3ca-6b7e-ca49-fa5668e1e5e2', '822b6a27-3050-ed0f-617a-4f3f3a529775', 2, 'ovelha', false),
  ('ea9f8045-3d38-eb06-31c5-3ba5310620a1', '822b6a27-3050-ed0f-617a-4f3f3a529775', 3, 'gato', false),
  ('29b83357-b412-8364-c99d-d7560448da06', '822b6a27-3050-ed0f-617a-4f3f3a529775', 4, 'cavalo', false),
  ('0c4f8046-2b96-f277-ae08-37fc3b4fe936', '1ac6488b-4a94-88cf-5bb8-67ce97270d54', 1, 'gato', true),
  ('f4ac1cfb-aba7-81d1-9a51-9eb949999c33', '1ac6488b-4a94-88cf-5bb8-67ce97270d54', 2, 'coelho', false),
  ('3e87a5e8-c38f-c66b-0f2b-44ab7a323fa0', '1ac6488b-4a94-88cf-5bb8-67ce97270d54', 3, 'vaca', false),
  ('d6ff38f7-4e09-eb9e-94cb-1f49e0434b15', '1ac6488b-4a94-88cf-5bb8-67ce97270d54', 4, 'borboleta', false);

insert into phases (id, track_id, number, title, format) values
  ('b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 'd037b5a1-67a0-0b76-a4c1-ce3614b6e220', 4, 'Compreender — parte 2', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('04d4be18-d3b3-b4a7-a511-e9f103e8a770', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 'Mestre de Animais', 'Dominou o vocabulário da trilha.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('e0916527-bd89-64f1-e55f-14f89c6d27f1', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 1, 'word_meaning', 'Animais', 'Rabbit', null, null, 'rabbit', 'Rabbit significa coelho.', null),
  ('c6488783-6929-d54c-fdda-f23bf1d2e577', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 2, 'word_meaning', 'Animais', 'Mouse', null, null, 'mouse', 'Mouse significa rato.', null),
  ('0a0ec062-c215-3dbd-547a-edbfbb261ff0', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 3, 'word_meaning', 'Animais', 'Sheep', null, null, 'sheep', 'Sheep significa ovelha.', null),
  ('30b377fb-797e-83ec-9f2e-11e977a9e473', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 4, 'word_meaning', 'Animais', 'Frog', null, null, 'frog', 'Frog significa sapo.', null),
  ('aee7b442-952f-5e39-0d53-4b1e6ce4bcb3', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 5, 'word_meaning', 'Animais', 'Bee', null, null, 'bee', 'Bee significa abelha.', null),
  ('a731d1b5-82e7-0d0c-eee1-581647949a47', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 6, 'word_meaning', 'Animais', 'Ant', null, null, 'ant', 'Ant significa formiga.', null),
  ('c40b6028-4509-3823-5582-bee4b84fa972', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 7, 'word_meaning', 'Animais', 'Butterfly', null, null, 'butterfly', 'Butterfly significa borboleta.', null),
  ('de1de872-ade0-d2c0-e731-9add6b2d7447', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 8, 'word_meaning', 'Animais', 'Turtle', null, null, 'turtle', 'Turtle significa tartaruga.', null),
  ('ab2cdd6a-2216-e3d1-524d-636e9de96588', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 9, 'word_meaning', 'Animais', 'Rabbit', null, null, 'rabbit', 'Rabbit significa coelho.', null),
  ('1e2c5154-117a-af57-4b96-07d31984d319', 'b760f78b-e553-8a7b-dd66-2b4cb81b7e5f', 10, 'word_meaning', 'Animais', 'Mouse', null, null, 'mouse', 'Mouse significa rato.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('0edc4837-440c-e232-43e9-0e09b461ddc9', 'e0916527-bd89-64f1-e55f-14f89c6d27f1', 1, 'tartaruga', false),
  ('08ee8054-17da-4229-6d26-0df4b75d1c1e', 'e0916527-bd89-64f1-e55f-14f89c6d27f1', 2, 'coelho', true),
  ('999e3429-c290-1492-6b0a-b9cc421ba92d', 'e0916527-bd89-64f1-e55f-14f89c6d27f1', 3, 'porco', false),
  ('1ee882b8-f6a9-2a1e-6db7-2ab1fb13774b', 'e0916527-bd89-64f1-e55f-14f89c6d27f1', 4, 'pássaro', false),
  ('71a2ce5d-2e47-11e3-576e-8917d9ebc334', 'c6488783-6929-d54c-fdda-f23bf1d2e577', 1, 'vaca', false),
  ('0f7617e0-8f04-9e59-9941-aa0f75804eb1', 'c6488783-6929-d54c-fdda-f23bf1d2e577', 2, 'pato', false),
  ('e8c5fbbe-6b93-64dd-f0c4-0a06239eec4f', 'c6488783-6929-d54c-fdda-f23bf1d2e577', 3, 'rato', true),
  ('7fb7c32b-cfba-1d8e-ca24-3c491b3274fe', 'c6488783-6929-d54c-fdda-f23bf1d2e577', 4, 'sapo', false),
  ('f9d50e75-a596-85a2-9453-5ba7f615943a', '0a0ec062-c215-3dbd-547a-edbfbb261ff0', 1, 'cachorro', false),
  ('f98d0ac1-976b-6cce-6381-408588a1d080', '0a0ec062-c215-3dbd-547a-edbfbb261ff0', 2, 'ovelha', true),
  ('3056c5b5-487f-1629-58b6-c64da7af900f', '0a0ec062-c215-3dbd-547a-edbfbb261ff0', 3, 'pato', false),
  ('b96dc54d-81f3-d9f6-e0db-75c0c7f7929b', '0a0ec062-c215-3dbd-547a-edbfbb261ff0', 4, 'rato', false),
  ('b3622152-3c3e-95bf-93f6-9783e4ca9030', '30b377fb-797e-83ec-9f2e-11e977a9e473', 1, 'gato', false),
  ('db352222-efa5-4a4e-55a9-7c6f060d27c3', '30b377fb-797e-83ec-9f2e-11e977a9e473', 2, 'tartaruga', false),
  ('4607253d-76ad-a5cf-e13d-846589651e59', '30b377fb-797e-83ec-9f2e-11e977a9e473', 3, 'rato', false),
  ('921fc146-c49b-1dda-8003-5ad6348b0bc4', '30b377fb-797e-83ec-9f2e-11e977a9e473', 4, 'sapo', true),
  ('00da6e5f-0063-2d0d-322f-89bcf827ea7a', 'aee7b442-952f-5e39-0d53-4b1e6ce4bcb3', 1, 'rato', false),
  ('82db6b1d-f1e4-c022-a99a-3eb0661cc142', 'aee7b442-952f-5e39-0d53-4b1e6ce4bcb3', 2, 'porco', false),
  ('f4ae75b7-2279-69c3-b5ca-d7452ad17746', 'aee7b442-952f-5e39-0d53-4b1e6ce4bcb3', 3, 'gato', false),
  ('003e22de-e4e7-4284-6f63-ec549bfa3533', 'aee7b442-952f-5e39-0d53-4b1e6ce4bcb3', 4, 'abelha', true),
  ('2dc4013f-1647-c2d4-63ce-1052a1187cd0', 'a731d1b5-82e7-0d0c-eee1-581647949a47', 1, 'formiga', true),
  ('155004bb-ffbf-10db-0e14-c2a6cb22d8c3', 'a731d1b5-82e7-0d0c-eee1-581647949a47', 2, 'borboleta', false),
  ('4003825c-dbdc-88ad-1908-dcdc2191f67a', 'a731d1b5-82e7-0d0c-eee1-581647949a47', 3, 'porco', false),
  ('6d667497-8edf-9d36-b854-c1049e225d4f', 'a731d1b5-82e7-0d0c-eee1-581647949a47', 4, 'cachorro', false),
  ('92060ee0-de64-a44f-2960-661a6d0cd2e0', 'c40b6028-4509-3823-5582-bee4b84fa972', 1, 'borboleta', true),
  ('ca656057-2184-eece-ed51-0802e4508e50', 'c40b6028-4509-3823-5582-bee4b84fa972', 2, 'coelho', false),
  ('8fdba202-81e3-6527-976b-110a11ce4e40', 'c40b6028-4509-3823-5582-bee4b84fa972', 3, 'pato', false),
  ('98c288ac-e5fd-47d7-c566-940836b47165', 'c40b6028-4509-3823-5582-bee4b84fa972', 4, 'sapo', false),
  ('b5b017ed-4fc1-21ac-a25b-3e9e919b3ffc', 'de1de872-ade0-d2c0-e731-9add6b2d7447', 1, 'tartaruga', true),
  ('90a21179-4723-271d-2848-632f9e8a6b08', 'de1de872-ade0-d2c0-e731-9add6b2d7447', 2, 'abelha', false),
  ('58f87410-04e2-bd50-242d-17ba52b88f9e', 'de1de872-ade0-d2c0-e731-9add6b2d7447', 3, 'pato', false),
  ('772028a9-366f-dea0-83ea-b9055d6143c1', 'de1de872-ade0-d2c0-e731-9add6b2d7447', 4, 'gato', false),
  ('4dbf1f7d-f852-b566-bd2c-8321676a1123', 'ab2cdd6a-2216-e3d1-524d-636e9de96588', 1, 'ovelha', false),
  ('29546ca6-daf2-25b4-523f-21524a5dbec6', 'ab2cdd6a-2216-e3d1-524d-636e9de96588', 2, 'abelha', false),
  ('af6461db-26ec-33e9-ed24-b1ac08c93993', 'ab2cdd6a-2216-e3d1-524d-636e9de96588', 3, 'pássaro', false),
  ('6c0954fa-2fe6-f50e-5523-8188eaeb61eb', 'ab2cdd6a-2216-e3d1-524d-636e9de96588', 4, 'coelho', true),
  ('e90cdf65-bf4f-9918-1db7-cbacedfa4606', '1e2c5154-117a-af57-4b96-07d31984d319', 1, 'vaca', false),
  ('41037b16-d317-2776-309e-7105b28d51e7', '1e2c5154-117a-af57-4b96-07d31984d319', 2, 'rato', true),
  ('ab2ac5e4-afc1-5896-a76b-9da1b0b513e5', '1e2c5154-117a-af57-4b96-07d31984d319', 3, 'abelha', false),
  ('ecef8a11-820f-5672-00f0-7f09d0d5f670', '1e2c5154-117a-af57-4b96-07d31984d319', 4, 'tartaruga', false);

-- Cores e números
insert into tracks (id, slug, title, band, position) values
  ('caebfdec-e6d6-1466-dfbe-e3f22f6b3ef2', 'cores-numeros', 'Cores e números', '1-2', 4);

insert into phases (id, track_id, number, title, format) values
  ('330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 'caebfdec-e6d6-1466-dfbe-e3f22f6b3ef2', 1, 'Reconhecer — parte 1', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('df97743b-35d8-741c-d708-124a9a35a712', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 'Descobridor de Cores e números', 'Reconheceu as primeiras palavras pela imagem.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('74940911-d81c-1a7d-e5da-f4ade525a630', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 1, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/red.webp', 'red', 'Red significa vermelho.', null),
  ('a47ef5cd-1465-5a40-cc91-b461d05863a5', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 2, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/blue.webp', 'blue', 'Blue significa azul.', null),
  ('b7ddd2f4-3f45-d0f5-29e5-59e9a6372892', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 3, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/green.webp', 'green', 'Green significa verde.', null),
  ('c932e448-9f87-cdef-2aec-997a219219d6', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 4, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/yellow.webp', 'yellow', 'Yellow significa amarelo.', null),
  ('14ae7c25-8604-120f-9f08-7a7b1f9ff5b1', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 5, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/black.webp', 'black', 'Black significa preto.', null),
  ('d1a805f5-1c5c-3b0d-07fd-a3231ecbdf08', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 6, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/white.webp', 'white', 'White significa branco.', null),
  ('fc810846-fc1f-ea41-fb44-82997d044a92', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 7, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/orange.webp', 'orange', 'Orange significa laranja.', null),
  ('df55ecce-0500-bb6d-3af6-8a6659090898', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 8, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/pink.webp', 'pink', 'Pink significa rosa.', null),
  ('35ff6eb1-c025-d88a-0794-ef69efe46c04', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 9, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/red.webp', 'red', 'Red significa vermelho.', null),
  ('df2c24da-1290-10f8-7707-454ade766c6c', '330aa3eb-010e-4d51-8ce5-1b6b232d6dc7', 10, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/blue.webp', 'blue', 'Blue significa azul.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('122af8ab-d4a1-10ab-7b50-6bb0bff42716', '74940911-d81c-1a7d-e5da-f4ade525a630', 1, 'White', false),
  ('4c556e86-1307-e4f7-dcf6-4daac837100f', '74940911-d81c-1a7d-e5da-f4ade525a630', 2, 'Three', false),
  ('91f83975-d7e8-4b67-3d27-da84c87ef406', '74940911-d81c-1a7d-e5da-f4ade525a630', 3, 'One', false),
  ('82ea211b-8da1-9c24-f584-c871311c01c7', '74940911-d81c-1a7d-e5da-f4ade525a630', 4, 'Red', true),
  ('2cf8e8cb-0f78-2c08-f92e-7c7703c3a7e7', 'a47ef5cd-1465-5a40-cc91-b461d05863a5', 1, 'Yellow', false),
  ('be2e7e09-dc9d-5bcf-9f5f-8774e11f8136', 'a47ef5cd-1465-5a40-cc91-b461d05863a5', 2, 'Green', false),
  ('6b55c4c9-df9f-06c8-8650-363fde0c0be2', 'a47ef5cd-1465-5a40-cc91-b461d05863a5', 3, 'Three', false),
  ('ef2ec4c2-7312-a408-0eda-6bffb11e963b', 'a47ef5cd-1465-5a40-cc91-b461d05863a5', 4, 'Blue', true),
  ('8e63d33f-ffe5-b279-6683-b486236717e4', 'b7ddd2f4-3f45-d0f5-29e5-59e9a6372892', 1, 'Green', true),
  ('087c7332-c7a5-4655-c453-e0d69acc2e21', 'b7ddd2f4-3f45-d0f5-29e5-59e9a6372892', 2, 'Red', false),
  ('08493a4e-6bed-311d-c91e-08426c801e5f', 'b7ddd2f4-3f45-d0f5-29e5-59e9a6372892', 3, 'Four', false),
  ('f8b56c84-63fe-10af-a44e-97d0a809dcb2', 'b7ddd2f4-3f45-d0f5-29e5-59e9a6372892', 4, 'Blue', false),
  ('b39a8395-3385-84e2-5236-4df96bb3d657', 'c932e448-9f87-cdef-2aec-997a219219d6', 1, 'Orange', false),
  ('afaa082c-0399-644e-5796-81f9e1d4cfab', 'c932e448-9f87-cdef-2aec-997a219219d6', 2, 'Two', false),
  ('b25ff3c8-45f8-5e1f-6c0c-64f92ac3b0f5', 'c932e448-9f87-cdef-2aec-997a219219d6', 3, 'Yellow', true),
  ('0cbbdedf-248c-033a-2053-94c96648197e', 'c932e448-9f87-cdef-2aec-997a219219d6', 4, 'Five', false),
  ('44d1f392-0a41-5511-0107-a87a52480bfa', '14ae7c25-8604-120f-9f08-7a7b1f9ff5b1', 1, 'Two', false),
  ('670e75ff-ef0c-7712-b539-cd172b974df0', '14ae7c25-8604-120f-9f08-7a7b1f9ff5b1', 2, 'Eight', false),
  ('4c691fc0-8059-925e-1bc4-7e1f2bb815ea', '14ae7c25-8604-120f-9f08-7a7b1f9ff5b1', 3, 'Black', true),
  ('d8440b41-e900-4882-c84a-20b0e258f819', '14ae7c25-8604-120f-9f08-7a7b1f9ff5b1', 4, 'Nine', false),
  ('e8934712-1dde-8a41-1ae8-29a9c3e14a99', 'd1a805f5-1c5c-3b0d-07fd-a3231ecbdf08', 1, 'Ten', false),
  ('89d5b786-3406-2b54-7d9d-e276ef784733', 'd1a805f5-1c5c-3b0d-07fd-a3231ecbdf08', 2, 'Red', false),
  ('b6d0bafb-017c-1455-b86b-99d6675c71e0', 'd1a805f5-1c5c-3b0d-07fd-a3231ecbdf08', 3, 'White', true),
  ('eb26c973-889f-40f7-58d0-a9b4fb5112af', 'd1a805f5-1c5c-3b0d-07fd-a3231ecbdf08', 4, 'Blue', false),
  ('3e8f6e70-1eef-1064-7c5d-ca0a15a89ddb', 'fc810846-fc1f-ea41-fb44-82997d044a92', 1, 'Red', false),
  ('d660badb-a7c3-6e1b-dced-00fbac9daf86', 'fc810846-fc1f-ea41-fb44-82997d044a92', 2, 'Orange', true),
  ('58785488-f8d7-f576-da1b-5c82ef0ce32e', 'fc810846-fc1f-ea41-fb44-82997d044a92', 3, 'Black', false),
  ('38c65959-c319-02ce-1755-60074ba7ba17', 'fc810846-fc1f-ea41-fb44-82997d044a92', 4, 'Yellow', false),
  ('e8e84506-7651-8605-f2a7-c976da52b959', 'df55ecce-0500-bb6d-3af6-8a6659090898', 1, 'Three', false),
  ('93f4b066-543a-d962-70f7-15e1a501b5a3', 'df55ecce-0500-bb6d-3af6-8a6659090898', 2, 'Ten', false),
  ('ecab3587-9068-6a2c-7a76-baa1d28e02c3', 'df55ecce-0500-bb6d-3af6-8a6659090898', 3, 'Pink', true),
  ('9fa89fd0-579b-3177-0744-862c38861560', 'df55ecce-0500-bb6d-3af6-8a6659090898', 4, 'Orange', false),
  ('f743e320-7bb8-ed18-c5a8-82473c6cb2b1', '35ff6eb1-c025-d88a-0794-ef69efe46c04', 1, 'Nine', false),
  ('1c009c71-35b2-6429-6b4f-a1edd9fb16ad', '35ff6eb1-c025-d88a-0794-ef69efe46c04', 2, 'Red', true),
  ('fb2c84bb-5dda-17b6-1feb-5ebee32b1607', '35ff6eb1-c025-d88a-0794-ef69efe46c04', 3, 'Pink', false),
  ('dfabcc3d-90f5-49c1-fa9a-5eb782b5e531', '35ff6eb1-c025-d88a-0794-ef69efe46c04', 4, 'Two', false),
  ('3585349b-906c-6c78-b31d-4aed7093421a', 'df2c24da-1290-10f8-7707-454ade766c6c', 1, 'Orange', false),
  ('6c1a8612-faee-4f95-f904-0e779a0ff665', 'df2c24da-1290-10f8-7707-454ade766c6c', 2, 'Blue', true),
  ('32b8f40c-030e-c996-ebd0-8d75699659d3', 'df2c24da-1290-10f8-7707-454ade766c6c', 3, 'Four', false),
  ('5346945d-51ed-4f8b-34fd-b3fa797ffb61', 'df2c24da-1290-10f8-7707-454ade766c6c', 4, 'Black', false);

insert into phases (id, track_id, number, title, format) values
  ('6deedf02-8c40-31b8-eb18-610b5db7f4eb', 'caebfdec-e6d6-1466-dfbe-e3f22f6b3ef2', 2, 'Reconhecer — parte 2', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('0a3ab880-95d6-a03c-30e7-cdecabe42b05', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 'Explorador de Cores e números', 'Reconheceu o segundo bloco de palavras.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('338d161b-44a8-854d-29f5-4356b8a97a21', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 1, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/one.webp', 'one', 'One significa um.', null),
  ('158fccdb-15a5-7c94-1bc5-78cfbba80e63', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 2, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/two.webp', 'two', 'Two significa dois.', null),
  ('d4518dd6-2c02-98de-0005-19a7abcca718', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 3, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/three.webp', 'three', 'Three significa três.', null),
  ('a7638baa-3d6b-aab1-6847-82417e307d00', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 4, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/four.webp', 'four', 'Four significa quatro.', null),
  ('fd63c6b1-371d-cd5d-24d1-ddf35e8bfae9', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 5, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/five.webp', 'five', 'Five significa cinco.', null),
  ('68a3e782-4f8c-93ac-be3b-5364e8f2d45d', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 6, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/six.webp', 'six', 'Six significa seis.', null),
  ('9de788b0-f2fa-197f-f784-8d2ac56ec554', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 7, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/seven.webp', 'seven', 'Seven significa sete.', null),
  ('f4f6acd1-e737-47d5-daa8-76098215ecef', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 8, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/eight.webp', 'eight', 'Eight significa oito.', null),
  ('5111a06f-1534-5811-fe28-c67493e81192', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 9, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/nine.webp', 'nine', 'Nine significa nove.', null),
  ('aa00d7f8-f092-8308-2911-8da3e4312650', '6deedf02-8c40-31b8-eb18-610b5db7f4eb', 10, 'image_word', 'Cores e números', 'What is this?', 'O que é isto?', '/quiz/ten.webp', 'ten', 'Ten significa dez.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('3550e5f6-f950-1919-1387-6088cee22851', '338d161b-44a8-854d-29f5-4356b8a97a21', 1, 'Three', false),
  ('7ee468b6-ec1f-e1d8-66a6-900d6f2a32d9', '338d161b-44a8-854d-29f5-4356b8a97a21', 2, 'One', true),
  ('ebab0209-cae0-67ff-86a0-fe96bff3e323', '338d161b-44a8-854d-29f5-4356b8a97a21', 3, 'Eight', false),
  ('f619612a-7d4a-8cd9-a490-4344dda89fc9', '338d161b-44a8-854d-29f5-4356b8a97a21', 4, 'Six', false),
  ('c87ccb37-c596-ccac-62ee-c7daa67b6662', '158fccdb-15a5-7c94-1bc5-78cfbba80e63', 1, 'Two', true),
  ('b50d1da8-4c3b-8a82-c318-3f7387896db2', '158fccdb-15a5-7c94-1bc5-78cfbba80e63', 2, 'White', false),
  ('f56bf885-972b-7c2b-e3f7-49ffa5faea8f', '158fccdb-15a5-7c94-1bc5-78cfbba80e63', 3, 'Five', false),
  ('c3dbe2c2-f780-518a-feda-fa5947af9f4b', '158fccdb-15a5-7c94-1bc5-78cfbba80e63', 4, 'One', false),
  ('e3ed94fe-8fd1-68a2-9673-c369b16cbb51', 'd4518dd6-2c02-98de-0005-19a7abcca718', 1, 'Three', true),
  ('53be5513-b20e-a73a-7395-ccfe9c9de096', 'd4518dd6-2c02-98de-0005-19a7abcca718', 2, 'Yellow', false),
  ('eb249cdf-86ae-6dc7-33af-227ce5460ff7', 'd4518dd6-2c02-98de-0005-19a7abcca718', 3, 'White', false),
  ('66d54453-5a06-6148-6f31-ca8ecd22e724', 'd4518dd6-2c02-98de-0005-19a7abcca718', 4, 'Eight', false),
  ('3916989f-90d1-399a-b6cf-e253c5a281ca', 'a7638baa-3d6b-aab1-6847-82417e307d00', 1, 'Five', false),
  ('0b7d1135-0bc2-a760-2854-5c808605cb94', 'a7638baa-3d6b-aab1-6847-82417e307d00', 2, 'One', false),
  ('0a8cb50b-e224-6fa2-de44-a3757ca6105a', 'a7638baa-3d6b-aab1-6847-82417e307d00', 3, 'Ten', false),
  ('b9b89028-3e6c-a23d-4013-37713371cfe4', 'a7638baa-3d6b-aab1-6847-82417e307d00', 4, 'Four', true),
  ('0322073b-6bc3-c9b1-085e-217b486c415b', 'fd63c6b1-371d-cd5d-24d1-ddf35e8bfae9', 1, 'Five', true),
  ('599bf721-16fd-390f-fc21-277b2f00621c', 'fd63c6b1-371d-cd5d-24d1-ddf35e8bfae9', 2, 'Red', false),
  ('7247b8a1-a912-f388-1bee-85d1c877e956', 'fd63c6b1-371d-cd5d-24d1-ddf35e8bfae9', 3, 'Three', false),
  ('8e64c9c0-078b-5f2d-e598-3f29bd9bf5fd', 'fd63c6b1-371d-cd5d-24d1-ddf35e8bfae9', 4, 'Blue', false),
  ('5e7bf15b-ade7-9809-8811-7ab4c9016531', '68a3e782-4f8c-93ac-be3b-5364e8f2d45d', 1, 'One', false),
  ('f8541b35-9df3-ed14-416c-70546dcf7e7a', '68a3e782-4f8c-93ac-be3b-5364e8f2d45d', 2, 'Five', false),
  ('a523604e-48aa-0c2d-366c-1dc41e7b1fa9', '68a3e782-4f8c-93ac-be3b-5364e8f2d45d', 3, 'Six', true),
  ('b976b483-fa59-4821-8a69-566eb6cf2b01', '68a3e782-4f8c-93ac-be3b-5364e8f2d45d', 4, 'Pink', false),
  ('5a65eeb9-03dc-b8ec-6ef4-253da2d6c5ad', '9de788b0-f2fa-197f-f784-8d2ac56ec554', 1, 'Black', false),
  ('a9017e59-b8d1-11e9-d9e4-1f0f3bb6ae19', '9de788b0-f2fa-197f-f784-8d2ac56ec554', 2, 'Six', false),
  ('db9d11ec-0c62-90f6-ff34-61682e74653a', '9de788b0-f2fa-197f-f784-8d2ac56ec554', 3, 'One', false),
  ('b091f5bb-24d9-34c7-6edf-248f66ef51fc', '9de788b0-f2fa-197f-f784-8d2ac56ec554', 4, 'Seven', true),
  ('ee5ef3ca-1ea9-755f-3d2e-ddd132cf8833', 'f4f6acd1-e737-47d5-daa8-76098215ecef', 1, 'Eight', true),
  ('30311eec-04e1-45dc-6cb0-4a2e90384090', 'f4f6acd1-e737-47d5-daa8-76098215ecef', 2, 'Seven', false),
  ('0b5f5163-b59c-7b2b-ba49-221506c89f52', 'f4f6acd1-e737-47d5-daa8-76098215ecef', 3, 'Orange', false),
  ('65b5835f-3df0-0e4a-0e4d-af55f83dd8f7', 'f4f6acd1-e737-47d5-daa8-76098215ecef', 4, 'White', false),
  ('fbe3d9d8-bbbc-472b-023e-07239ff345e5', '5111a06f-1534-5811-fe28-c67493e81192', 1, 'Ten', false),
  ('0ffd8509-4d9f-de7e-256e-b739c22fc363', '5111a06f-1534-5811-fe28-c67493e81192', 2, 'Five', false),
  ('eece453b-5139-c774-8895-852eb5de7f1d', '5111a06f-1534-5811-fe28-c67493e81192', 3, 'Nine', true),
  ('9a70ae46-9441-f0a8-e2f5-e9c48b20b32c', '5111a06f-1534-5811-fe28-c67493e81192', 4, 'Orange', false),
  ('ff029ba1-2b1a-5084-8184-92c387d1f9f9', 'aa00d7f8-f092-8308-2911-8da3e4312650', 1, 'Green', false),
  ('1adec4cc-5ec1-1846-4e6d-4bd581076201', 'aa00d7f8-f092-8308-2911-8da3e4312650', 2, 'Ten', true),
  ('2d9ebc12-bd1f-6701-687d-9a0d271a4ddb', 'aa00d7f8-f092-8308-2911-8da3e4312650', 3, 'White', false),
  ('80474cd2-cd3f-b211-7af3-08379aaec08c', 'aa00d7f8-f092-8308-2911-8da3e4312650', 4, 'Black', false);

insert into phases (id, track_id, number, title, format) values
  ('9abaf7be-5597-9716-5677-0dd2bc1e8560', 'caebfdec-e6d6-1466-dfbe-e3f22f6b3ef2', 3, 'Compreender — parte 1', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('ec16e060-a954-c914-10b6-ccd66115667f', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 'Leitor de Cores e números', 'Leu e compreendeu as palavras em inglês.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('579f3a5e-eef8-37f0-ea41-558e42e387b7', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 1, 'word_meaning', 'Cores e números', 'Red', null, null, 'red', 'Red significa vermelho.', null),
  ('cc42b85f-1a19-5242-744b-bb05f01edcd8', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 2, 'word_meaning', 'Cores e números', 'Blue', null, null, 'blue', 'Blue significa azul.', null),
  ('12b4bf6c-8f60-f587-94ac-7917bea6cde1', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 3, 'word_meaning', 'Cores e números', 'Green', null, null, 'green', 'Green significa verde.', null),
  ('8756a134-12c1-bd83-f9e0-d43bf80df5a5', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 4, 'word_meaning', 'Cores e números', 'Yellow', null, null, 'yellow', 'Yellow significa amarelo.', null),
  ('e5c8b57c-43d6-8403-97ed-0e00b2e943e8', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 5, 'word_meaning', 'Cores e números', 'Black', null, null, 'black', 'Black significa preto.', null),
  ('6f625cd0-c99f-4943-4e87-294dabd263db', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 6, 'word_meaning', 'Cores e números', 'White', null, null, 'white', 'White significa branco.', null),
  ('ef395b7d-bf25-bcc7-7380-6511334593a1', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 7, 'word_meaning', 'Cores e números', 'Orange', null, null, 'orange', 'Orange significa laranja.', null),
  ('e7d0abf1-afc4-346b-fad4-8e62f4cc91d5', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 8, 'word_meaning', 'Cores e números', 'Pink', null, null, 'pink', 'Pink significa rosa.', null),
  ('316b464c-601d-588e-6d45-72a0ce7e03e0', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 9, 'word_meaning', 'Cores e números', 'Red', null, null, 'red', 'Red significa vermelho.', null),
  ('aafabb3c-5db2-88a9-d156-63d471f219fa', '9abaf7be-5597-9716-5677-0dd2bc1e8560', 10, 'word_meaning', 'Cores e números', 'Blue', null, null, 'blue', 'Blue significa azul.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('1f550e1a-9b92-9453-a464-08c37fa4e1e9', '579f3a5e-eef8-37f0-ea41-558e42e387b7', 1, 'sete', false),
  ('cbb6d9f3-eac3-d81a-5636-acc060566172', '579f3a5e-eef8-37f0-ea41-558e42e387b7', 2, 'nove', false),
  ('41be3ab0-c616-8b24-940a-750740f15d0a', '579f3a5e-eef8-37f0-ea41-558e42e387b7', 3, 'vermelho', true),
  ('eb51a129-3121-7f93-174d-b440fb522a49', '579f3a5e-eef8-37f0-ea41-558e42e387b7', 4, 'três', false),
  ('1f4828a7-9e4d-4c6d-4438-c02aeeb8c2db', 'cc42b85f-1a19-5242-744b-bb05f01edcd8', 1, 'vermelho', false),
  ('fc425d91-267f-d2f0-05a3-be874378ac7d', 'cc42b85f-1a19-5242-744b-bb05f01edcd8', 2, 'azul', true),
  ('f6edeb8d-130f-44fa-5780-a6bf0df071ed', 'cc42b85f-1a19-5242-744b-bb05f01edcd8', 3, 'dez', false),
  ('f9e3c342-c856-04a5-6e4d-e447b2c6f205', 'cc42b85f-1a19-5242-744b-bb05f01edcd8', 4, 'sete', false),
  ('dd7dd709-b8d4-0ab5-8f80-bc4bd63fb2b6', '12b4bf6c-8f60-f587-94ac-7917bea6cde1', 1, 'verde', true),
  ('4538011f-5736-a733-886f-b0a70ef18c57', '12b4bf6c-8f60-f587-94ac-7917bea6cde1', 2, 'cinco', false),
  ('299bca47-f298-61c1-cff6-180a226c7d49', '12b4bf6c-8f60-f587-94ac-7917bea6cde1', 3, 'dois', false),
  ('f9f6395f-b624-d491-6597-1ae0fd5094a2', '12b4bf6c-8f60-f587-94ac-7917bea6cde1', 4, 'vermelho', false),
  ('5e27d094-b607-aaad-3741-da906916a39c', '8756a134-12c1-bd83-f9e0-d43bf80df5a5', 1, 'amarelo', true),
  ('e5fff767-4b48-46c7-ddb5-171a63750104', '8756a134-12c1-bd83-f9e0-d43bf80df5a5', 2, 'sete', false),
  ('851b00fe-0fb1-15ee-1a28-8ea4ffd9b2f1', '8756a134-12c1-bd83-f9e0-d43bf80df5a5', 3, 'cinco', false),
  ('15f27b99-2eea-edbb-4a3f-201e03d78463', '8756a134-12c1-bd83-f9e0-d43bf80df5a5', 4, 'oito', false),
  ('463fe1be-5f8b-d4ef-1b5e-4b7456ec82ac', 'e5c8b57c-43d6-8403-97ed-0e00b2e943e8', 1, 'cinco', false),
  ('5c8345da-b0fa-4a6b-4f1e-8b06d8104f72', 'e5c8b57c-43d6-8403-97ed-0e00b2e943e8', 2, 'dez', false),
  ('ca1510d5-8c89-31dd-c354-ffbd8968b558', 'e5c8b57c-43d6-8403-97ed-0e00b2e943e8', 3, 'preto', true),
  ('a72e631c-8268-b683-abe4-7fec1de8df02', 'e5c8b57c-43d6-8403-97ed-0e00b2e943e8', 4, 'dois', false),
  ('41d7770d-e540-6b6f-5c26-56ca48008c65', '6f625cd0-c99f-4943-4e87-294dabd263db', 1, 'preto', false),
  ('591029c9-bada-274d-cd92-79b7a185e44b', '6f625cd0-c99f-4943-4e87-294dabd263db', 2, 'oito', false),
  ('333af266-8b4c-6558-7a6c-83477e9ae0dd', '6f625cd0-c99f-4943-4e87-294dabd263db', 3, 'dois', false),
  ('2ef1fb9a-0cfb-8ff6-b62f-7b8fee7fbb02', '6f625cd0-c99f-4943-4e87-294dabd263db', 4, 'branco', true),
  ('4f04f1fe-f9f9-54d6-fd88-449099069052', 'ef395b7d-bf25-bcc7-7380-6511334593a1', 1, 'dez', false),
  ('4c5af249-2851-8145-6265-32ae7161a9e0', 'ef395b7d-bf25-bcc7-7380-6511334593a1', 2, 'laranja', true),
  ('56389085-ebe1-dc66-df85-2aed637b2e94', 'ef395b7d-bf25-bcc7-7380-6511334593a1', 3, 'um', false),
  ('5c857bc0-03e1-4491-99ba-926a239a9592', 'ef395b7d-bf25-bcc7-7380-6511334593a1', 4, 'oito', false),
  ('203b378d-e1d5-4de2-88ed-9b8ffeaf780f', 'e7d0abf1-afc4-346b-fad4-8e62f4cc91d5', 1, 'azul', false),
  ('5f7ea820-1c8e-4769-31b7-b054dc9f33bd', 'e7d0abf1-afc4-346b-fad4-8e62f4cc91d5', 2, 'rosa', true),
  ('ac4714fd-b474-d5a2-c25a-391c97ba851e', 'e7d0abf1-afc4-346b-fad4-8e62f4cc91d5', 3, 'seis', false),
  ('01451b59-b38f-1586-bd7b-6389eb752910', 'e7d0abf1-afc4-346b-fad4-8e62f4cc91d5', 4, 'cinco', false),
  ('669402d3-3ef2-744b-2ef8-ef9cfc46e0fd', '316b464c-601d-588e-6d45-72a0ce7e03e0', 1, 'vermelho', true),
  ('79374a09-0166-af9e-1e60-9cf7662ffdfc', '316b464c-601d-588e-6d45-72a0ce7e03e0', 2, 'azul', false),
  ('04486a0c-266f-4ee7-0611-10817a8c2a58', '316b464c-601d-588e-6d45-72a0ce7e03e0', 3, 'nove', false),
  ('93b34213-2dcc-f917-4af9-be48de9618ac', '316b464c-601d-588e-6d45-72a0ce7e03e0', 4, 'seis', false),
  ('f9f53c2e-5df0-f207-4388-e7e7d6ba0317', 'aafabb3c-5db2-88a9-d156-63d471f219fa', 1, 'verde', false),
  ('d8aa375a-bc14-1365-f3d2-b68d21eeaec7', 'aafabb3c-5db2-88a9-d156-63d471f219fa', 2, 'seis', false),
  ('8df1410d-fca1-47af-59af-f59dcef2466b', 'aafabb3c-5db2-88a9-d156-63d471f219fa', 3, 'nove', false),
  ('78b81bdd-7560-8c25-f502-67f0734c5799', 'aafabb3c-5db2-88a9-d156-63d471f219fa', 4, 'azul', true);

insert into phases (id, track_id, number, title, format) values
  ('6dd0377d-a233-ba79-47a4-80305f36efec', 'caebfdec-e6d6-1466-dfbe-e3f22f6b3ef2', 4, 'Compreender — parte 2', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('8d4c0e41-69a9-cc8a-691d-5ebfee34338a', '6dd0377d-a233-ba79-47a4-80305f36efec', 'Mestre de Cores e números', 'Dominou o vocabulário da trilha.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('a0094c07-bf18-d170-c595-a55148095974', '6dd0377d-a233-ba79-47a4-80305f36efec', 1, 'word_meaning', 'Cores e números', 'One', null, null, 'one', 'One significa um.', null),
  ('7df6e20e-0108-96c0-f775-326cf9ee781c', '6dd0377d-a233-ba79-47a4-80305f36efec', 2, 'word_meaning', 'Cores e números', 'Two', null, null, 'two', 'Two significa dois.', null),
  ('cee13d93-d3c4-7fac-27ed-ff1fb2fab976', '6dd0377d-a233-ba79-47a4-80305f36efec', 3, 'word_meaning', 'Cores e números', 'Three', null, null, 'three', 'Three significa três.', null),
  ('925237ee-f102-3e01-61a2-08f13f9ff4c5', '6dd0377d-a233-ba79-47a4-80305f36efec', 4, 'word_meaning', 'Cores e números', 'Four', null, null, 'four', 'Four significa quatro.', null),
  ('919c8a00-5983-685f-90d1-9bb19f6770d6', '6dd0377d-a233-ba79-47a4-80305f36efec', 5, 'word_meaning', 'Cores e números', 'Five', null, null, 'five', 'Five significa cinco.', null),
  ('1d7ce784-eb8e-e31b-c55f-f0813179b87b', '6dd0377d-a233-ba79-47a4-80305f36efec', 6, 'word_meaning', 'Cores e números', 'Six', null, null, 'six', 'Six significa seis.', null),
  ('dd707605-4732-3b2b-16ff-a88cba0f682a', '6dd0377d-a233-ba79-47a4-80305f36efec', 7, 'word_meaning', 'Cores e números', 'Seven', null, null, 'seven', 'Seven significa sete.', null),
  ('e036342a-3fb4-dedb-35ee-f54c1694e60b', '6dd0377d-a233-ba79-47a4-80305f36efec', 8, 'word_meaning', 'Cores e números', 'Eight', null, null, 'eight', 'Eight significa oito.', null),
  ('5d7517ba-f255-4cc2-fd35-b6e3114e6648', '6dd0377d-a233-ba79-47a4-80305f36efec', 9, 'word_meaning', 'Cores e números', 'Nine', null, null, 'nine', 'Nine significa nove.', null),
  ('730640a9-27da-6064-e687-6b343c9250b1', '6dd0377d-a233-ba79-47a4-80305f36efec', 10, 'word_meaning', 'Cores e números', 'Ten', null, null, 'ten', 'Ten significa dez.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('8e91f791-ba5c-7a17-b657-f1e4ac6c2076', 'a0094c07-bf18-d170-c595-a55148095974', 1, 'nove', false),
  ('33b17357-57b7-451a-b623-da5ebac023e5', 'a0094c07-bf18-d170-c595-a55148095974', 2, 'seis', false),
  ('141248ad-dd7d-d01d-4029-e962d4ca16e0', 'a0094c07-bf18-d170-c595-a55148095974', 3, 'um', true),
  ('130f97d5-caf5-9fe4-8034-d9e30568a33f', 'a0094c07-bf18-d170-c595-a55148095974', 4, 'cinco', false),
  ('93e59d4f-be65-a453-6877-93501b1bb892', '7df6e20e-0108-96c0-f775-326cf9ee781c', 1, 'oito', false),
  ('873bb835-5552-1695-6cf4-431d4e0e1be0', '7df6e20e-0108-96c0-f775-326cf9ee781c', 2, 'amarelo', false),
  ('342e57dd-609b-3bbc-f9ce-26194cbd6984', '7df6e20e-0108-96c0-f775-326cf9ee781c', 3, 'branco', false),
  ('5c5be38c-6a01-0552-f787-9b3c68a91bda', '7df6e20e-0108-96c0-f775-326cf9ee781c', 4, 'dois', true),
  ('6b30434a-1f25-15ec-b1ce-9ea18ddd4fda', 'cee13d93-d3c4-7fac-27ed-ff1fb2fab976', 1, 'dois', false),
  ('733678ac-b052-d70f-8846-ae8bb6e50e86', 'cee13d93-d3c4-7fac-27ed-ff1fb2fab976', 2, 'quatro', false),
  ('d4d5cbc4-cf2d-0ba9-a487-99a86dad0456', 'cee13d93-d3c4-7fac-27ed-ff1fb2fab976', 3, 'três', true),
  ('31eb7214-3d82-4628-3461-1f925a07a579', 'cee13d93-d3c4-7fac-27ed-ff1fb2fab976', 4, 'sete', false),
  ('27045b71-b74f-af90-d28e-d39a6cf0d4e2', '925237ee-f102-3e01-61a2-08f13f9ff4c5', 1, 'branco', false),
  ('8d4c162d-ed90-5086-2c63-b71c15c3794e', '925237ee-f102-3e01-61a2-08f13f9ff4c5', 2, 'quatro', true),
  ('2b7f239b-c050-a676-ca08-46c995c6a727', '925237ee-f102-3e01-61a2-08f13f9ff4c5', 3, 'nove', false),
  ('30aea864-533f-0d58-39bc-105a1990aec3', '925237ee-f102-3e01-61a2-08f13f9ff4c5', 4, 'verde', false),
  ('c84f32f0-2774-c10f-38c0-595aa47fe53d', '919c8a00-5983-685f-90d1-9bb19f6770d6', 1, 'amarelo', false),
  ('c12f345a-5e9a-e0df-946b-73cb472b8c83', '919c8a00-5983-685f-90d1-9bb19f6770d6', 2, 'cinco', true),
  ('de8e28b8-1879-79e3-b970-4e7818ca5c2e', '919c8a00-5983-685f-90d1-9bb19f6770d6', 3, 'um', false),
  ('c507aa7c-dbae-b538-869b-1fd65d4813c8', '919c8a00-5983-685f-90d1-9bb19f6770d6', 4, 'verde', false),
  ('c89d2994-4238-ace2-1add-7b3fb7d4f73c', '1d7ce784-eb8e-e31b-c55f-f0813179b87b', 1, 'um', false),
  ('017b1fab-f11b-6413-6141-d41d5c24078c', '1d7ce784-eb8e-e31b-c55f-f0813179b87b', 2, 'seis', true),
  ('14cef766-9c24-3f33-e758-4f358d472c72', '1d7ce784-eb8e-e31b-c55f-f0813179b87b', 3, 'dois', false),
  ('785ad699-c0da-ec58-53c2-3fb11c9172ab', '1d7ce784-eb8e-e31b-c55f-f0813179b87b', 4, 'oito', false),
  ('8c0192c0-6891-d60c-24f4-22f711f1c952', 'dd707605-4732-3b2b-16ff-a88cba0f682a', 1, 'três', false),
  ('b34ed87c-fd5d-ef19-cf30-395cf4338381', 'dd707605-4732-3b2b-16ff-a88cba0f682a', 2, 'laranja', false),
  ('685207c7-c328-e9a8-9b97-8c23417c2420', 'dd707605-4732-3b2b-16ff-a88cba0f682a', 3, 'sete', true),
  ('dbec76ba-02e9-77f1-c139-303abbd9234d', 'dd707605-4732-3b2b-16ff-a88cba0f682a', 4, 'um', false),
  ('99eb2f78-ba8a-a216-87b4-af9f275660d6', 'e036342a-3fb4-dedb-35ee-f54c1694e60b', 1, 'rosa', false),
  ('17033600-fb14-4bf9-1920-49008ca4ad27', 'e036342a-3fb4-dedb-35ee-f54c1694e60b', 2, 'oito', true),
  ('e081be62-ff2a-9e19-dc4e-c551b87ecc3a', 'e036342a-3fb4-dedb-35ee-f54c1694e60b', 3, 'laranja', false),
  ('ac62a97d-da16-c830-2d1a-6a2134207719', 'e036342a-3fb4-dedb-35ee-f54c1694e60b', 4, 'preto', false),
  ('e7c7c236-0bfe-7124-de80-ab6731cd4d0c', '5d7517ba-f255-4cc2-fd35-b6e3114e6648', 1, 'vermelho', false),
  ('fe5a09b0-4075-9301-4165-ba7e9b9e091d', '5d7517ba-f255-4cc2-fd35-b6e3114e6648', 2, 'verde', false),
  ('22741938-b903-dd28-043a-7cf03400073b', '5d7517ba-f255-4cc2-fd35-b6e3114e6648', 3, 'quatro', false),
  ('bbbfcfcd-87f3-7d0c-5edd-eb8629f60559', '5d7517ba-f255-4cc2-fd35-b6e3114e6648', 4, 'nove', true),
  ('b886e4f9-6083-0e31-d02b-c3686fdbdd60', '730640a9-27da-6064-e687-6b343c9250b1', 1, 'quatro', false),
  ('3bf3f536-26fd-a150-758a-5998a3026ba9', '730640a9-27da-6064-e687-6b343c9250b1', 2, 'azul', false),
  ('512155f1-ba2d-0b2c-21fa-e376a92c91f1', '730640a9-27da-6064-e687-6b343c9250b1', 3, 'dez', true),
  ('dcd72955-e3d8-2e50-2f3e-b49f1f569ca0', '730640a9-27da-6064-e687-6b343c9250b1', 4, 'rosa', false);

-- Comida
insert into tracks (id, slug, title, band, position) values
  ('5f649f42-8a7e-3b0a-1732-2ef144e400b8', 'comida', 'Comida', '1-2', 5);

insert into phases (id, track_id, number, title, format) values
  ('ee7e36be-52b2-0861-7240-d37b97bb574b', '5f649f42-8a7e-3b0a-1732-2ef144e400b8', 1, 'Reconhecer — parte 1', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('387fad0a-d2bf-33bc-8e74-2427be434172', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 'Descobridor de Comida', 'Reconheceu as primeiras palavras pela imagem.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('1008ffbd-33df-6dbb-6fee-6221c497c188', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 1, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/bread.webp', 'bread', 'Bread significa pão.', null),
  ('ec0c4192-8bda-b361-ebd3-f84525f0f888', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 2, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/rice.webp', 'rice', 'Rice significa arroz.', null),
  ('683cd702-03db-df41-c114-266018b01893', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 3, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/egg.webp', 'egg', 'Egg significa ovo.', null),
  ('96b14d15-40cc-00b6-8417-a365802d4959', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 4, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/meat.webp', 'meat', 'Meat significa carne.', null),
  ('a3af62c5-184f-cd3c-6329-8260a44d7970', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 5, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/chicken.webp', 'chicken', 'Chicken significa frango.', null),
  ('5374980c-fef4-4fb0-8655-211cc4c5c898', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 6, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/cheese.webp', 'cheese', 'Cheese significa queijo.', null),
  ('bd77e117-370f-d1c9-92e1-01ae47c2c14d', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 7, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/soup.webp', 'soup', 'Soup significa sopa.', null),
  ('51b3beea-16ce-d9b9-5f0f-6e521abdb32c', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 8, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/cake.webp', 'cake', 'Cake significa bolo.', null),
  ('78669ce6-9c87-1f43-b3fe-3d4f33d38852', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 9, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/bread.webp', 'bread', 'Bread significa pão.', null),
  ('5e9de232-49cc-c90d-9daf-594f3df4a14c', 'ee7e36be-52b2-0861-7240-d37b97bb574b', 10, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/rice.webp', 'rice', 'Rice significa arroz.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('0bb7b035-7151-15cb-00d8-ce66bb65f01e', '1008ffbd-33df-6dbb-6fee-6221c497c188', 1, 'Cake', false),
  ('7c434bed-7a05-687d-82fc-eac98a8de9c0', '1008ffbd-33df-6dbb-6fee-6221c497c188', 2, 'Bread', true),
  ('4d8fbf31-9679-069b-e994-c1c02d46e78c', '1008ffbd-33df-6dbb-6fee-6221c497c188', 3, 'Rice', false),
  ('9e6c5af5-f3ae-fd30-3727-b9a613717f6c', '1008ffbd-33df-6dbb-6fee-6221c497c188', 4, 'Water', false),
  ('04aaf1a5-e07d-07bd-6085-b453e90bc39d', 'ec0c4192-8bda-b361-ebd3-f84525f0f888', 1, 'Apple', false),
  ('e2c42457-6adb-fc55-da08-9110ec5d03b3', 'ec0c4192-8bda-b361-ebd3-f84525f0f888', 2, 'Rice', true),
  ('0b1ad71a-e2c6-c561-674a-b17b3bfd24cf', 'ec0c4192-8bda-b361-ebd3-f84525f0f888', 3, 'Butter', false),
  ('d728745f-4085-065d-53a6-74258c7183c8', 'ec0c4192-8bda-b361-ebd3-f84525f0f888', 4, 'Juice', false),
  ('878dbe41-a0be-2f9e-845e-ef17149e121b', '683cd702-03db-df41-c114-266018b01893', 1, 'Water', false),
  ('b43a9b20-9e75-012f-fe59-854497099b71', '683cd702-03db-df41-c114-266018b01893', 2, 'Bread', false),
  ('ee67e6c1-8f06-ea96-7b26-2b78cfeae78a', '683cd702-03db-df41-c114-266018b01893', 3, 'Egg', true),
  ('0cbb6f18-5ee7-33c0-ebc5-5eae3aebae6e', '683cd702-03db-df41-c114-266018b01893', 4, 'Cheese', false),
  ('35955b6f-774c-5888-dc9e-bb64059fd6b7', '96b14d15-40cc-00b6-8417-a365802d4959', 1, 'Meat', true),
  ('05b5edaa-72ca-9e96-4075-c4501293c7cd', '96b14d15-40cc-00b6-8417-a365802d4959', 2, 'Sugar', false),
  ('ef3efc1d-c1d7-36ea-103b-5c2a389cc44b', '96b14d15-40cc-00b6-8417-a365802d4959', 3, 'Banana', false),
  ('14aa01d2-58c5-8ad1-30bc-ab2ff8d8b33c', '96b14d15-40cc-00b6-8417-a365802d4959', 4, 'Milk', false),
  ('64034a6d-d60d-023e-f49a-70d415883215', 'a3af62c5-184f-cd3c-6329-8260a44d7970', 1, 'Butter', false),
  ('4f839a91-8ceb-fe11-04e5-12b87b08a698', 'a3af62c5-184f-cd3c-6329-8260a44d7970', 2, 'Meat', false),
  ('610a71ea-7b1e-8f14-3aed-d6f277217a87', 'a3af62c5-184f-cd3c-6329-8260a44d7970', 3, 'Banana', false),
  ('fca8b71f-90e8-e91a-3284-63369a7fb917', 'a3af62c5-184f-cd3c-6329-8260a44d7970', 4, 'Chicken', true),
  ('dbec1eb5-0119-21c8-a787-4f38985930b2', '5374980c-fef4-4fb0-8655-211cc4c5c898', 1, 'Cheese', true),
  ('259b2851-47e8-d461-a486-d44fadadf9be', '5374980c-fef4-4fb0-8655-211cc4c5c898', 2, 'Water', false),
  ('2cc3f6b5-8e05-7f25-3fed-594d4ef8db2e', '5374980c-fef4-4fb0-8655-211cc4c5c898', 3, 'Banana', false),
  ('2e231b54-e212-36ee-60e1-f40d9359c471', '5374980c-fef4-4fb0-8655-211cc4c5c898', 4, 'Chicken', false),
  ('3ea227fd-241d-13cc-c451-f199519aa552', 'bd77e117-370f-d1c9-92e1-01ae47c2c14d', 1, 'Cheese', false),
  ('95b0abb1-d5f5-9973-7ef6-cd1c6c4a8191', 'bd77e117-370f-d1c9-92e1-01ae47c2c14d', 2, 'Salt', false),
  ('f37e3c8b-8ea2-b859-7ed6-9c586dbac3bc', 'bd77e117-370f-d1c9-92e1-01ae47c2c14d', 3, 'Soup', true),
  ('83d63727-6faf-dabd-3ba1-1b5cece633d1', 'bd77e117-370f-d1c9-92e1-01ae47c2c14d', 4, 'Banana', false),
  ('ac61b65f-448c-83f4-884b-ef8907842281', '51b3beea-16ce-d9b9-5f0f-6e521abdb32c', 1, 'Banana', false),
  ('c9564350-d155-22bc-9402-b44690766a59', '51b3beea-16ce-d9b9-5f0f-6e521abdb32c', 2, 'Butter', false),
  ('d3a0eea5-3977-7f83-a4d8-205dd3e26a55', '51b3beea-16ce-d9b9-5f0f-6e521abdb32c', 3, 'Cake', true),
  ('277fda95-5c95-9c62-410b-8847f19d53bf', '51b3beea-16ce-d9b9-5f0f-6e521abdb32c', 4, 'Chicken', false),
  ('67672fca-162b-99be-afaa-7557ff762162', '78669ce6-9c87-1f43-b3fe-3d4f33d38852', 1, 'Bread', true),
  ('6101a900-e0a5-a16a-1add-e3c55c73f63e', '78669ce6-9c87-1f43-b3fe-3d4f33d38852', 2, 'Salt', false),
  ('69319193-e288-9b2c-95cb-867c73773f19', '78669ce6-9c87-1f43-b3fe-3d4f33d38852', 3, 'Sugar', false),
  ('5a087ffc-0fdc-c0ea-24fc-9b8899f3a594', '78669ce6-9c87-1f43-b3fe-3d4f33d38852', 4, 'Milk', false),
  ('f5bbcb88-4331-5ced-8747-01a215042764', '5e9de232-49cc-c90d-9daf-594f3df4a14c', 1, 'Rice', true),
  ('7fa60c66-b366-8f6e-c5b5-c407184c7c8b', '5e9de232-49cc-c90d-9daf-594f3df4a14c', 2, 'Milk', false),
  ('a6adc668-cd0c-0a6d-6baa-c261b3eacc06', '5e9de232-49cc-c90d-9daf-594f3df4a14c', 3, 'Cake', false),
  ('ddab73fa-e5ce-1603-a60a-e1d2789c1137', '5e9de232-49cc-c90d-9daf-594f3df4a14c', 4, 'Butter', false);

insert into phases (id, track_id, number, title, format) values
  ('0d48aa76-1871-17ac-d07e-6c7656398b68', '5f649f42-8a7e-3b0a-1732-2ef144e400b8', 2, 'Reconhecer — parte 2', 'image_word');

insert into badges (id, phase_id, name, description, image_url) values
  ('aa133281-e286-76bc-770e-2c54a6c43bfe', '0d48aa76-1871-17ac-d07e-6c7656398b68', 'Explorador de Comida', 'Reconheceu o segundo bloco de palavras.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('a7c270b8-02fb-6359-7f10-4eafd5d05938', '0d48aa76-1871-17ac-d07e-6c7656398b68', 1, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/milk.webp', 'milk', 'Milk significa leite.', null),
  ('c7c098e4-579a-d9bd-d847-089c29db8382', '0d48aa76-1871-17ac-d07e-6c7656398b68', 2, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/water.webp', 'water', 'Water significa água.', null),
  ('377607e3-be88-ff1b-b187-ace606685627', '0d48aa76-1871-17ac-d07e-6c7656398b68', 3, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/juice.webp', 'juice', 'Juice significa suco.', null),
  ('67c29c8d-d672-2d02-4181-47e0bb26f0b4', '0d48aa76-1871-17ac-d07e-6c7656398b68', 4, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/apple.webp', 'apple', 'Apple significa maçã.', null),
  ('0465099d-69c6-a573-b44e-31a82597382b', '0d48aa76-1871-17ac-d07e-6c7656398b68', 5, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/banana.webp', 'banana', 'Banana significa banana.', null),
  ('fbf5a6c5-da7e-8b51-7283-b17a260dd07c', '0d48aa76-1871-17ac-d07e-6c7656398b68', 6, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/butter.webp', 'butter', 'Butter significa manteiga.', null),
  ('8fb270bd-27cd-07ee-a00a-2a80abeec347', '0d48aa76-1871-17ac-d07e-6c7656398b68', 7, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/sugar.webp', 'sugar', 'Sugar significa açúcar.', null),
  ('797f945f-6313-6e90-b890-85ed0787d9b8', '0d48aa76-1871-17ac-d07e-6c7656398b68', 8, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/salt.webp', 'salt', 'Salt significa sal.', null),
  ('7c9d4392-9dc5-d8d3-4432-9e432f2903b8', '0d48aa76-1871-17ac-d07e-6c7656398b68', 9, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/milk.webp', 'milk', 'Milk significa leite.', null),
  ('9db55598-6b83-0858-c490-ae0c8c8dacc8', '0d48aa76-1871-17ac-d07e-6c7656398b68', 10, 'image_word', 'Comida', 'What is this?', 'O que é isto?', '/quiz/water.webp', 'water', 'Water significa água.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('ac7d66d1-0895-2def-4480-825bcaed2714', 'a7c270b8-02fb-6359-7f10-4eafd5d05938', 1, 'Milk', true),
  ('c6eb1359-09c6-6901-7ed4-108b13abea2a', 'a7c270b8-02fb-6359-7f10-4eafd5d05938', 2, 'Chicken', false),
  ('2093897e-3d7c-3cab-79ce-5e0069348825', 'a7c270b8-02fb-6359-7f10-4eafd5d05938', 3, 'Bread', false),
  ('9199e317-172c-93f9-b246-39e88ae983d5', 'a7c270b8-02fb-6359-7f10-4eafd5d05938', 4, 'Banana', false),
  ('c92b6105-faf3-9d0c-3fd0-38856c0f2523', 'c7c098e4-579a-d9bd-d847-089c29db8382', 1, 'Water', true),
  ('efe09418-d930-55b6-1d2a-b7e5f1424534', 'c7c098e4-579a-d9bd-d847-089c29db8382', 2, 'Butter', false),
  ('bb628f84-9ce4-157e-93a0-de090646b217', 'c7c098e4-579a-d9bd-d847-089c29db8382', 3, 'Salt', false),
  ('0d3239ee-1cef-e9f3-56fe-4f7ea954ff5a', 'c7c098e4-579a-d9bd-d847-089c29db8382', 4, 'Cake', false),
  ('950262b5-e7f6-f890-ce97-b1dfc6013c26', '377607e3-be88-ff1b-b187-ace606685627', 1, 'Juice', true),
  ('a36d69ef-7112-f093-5cdb-7add07d603a8', '377607e3-be88-ff1b-b187-ace606685627', 2, 'Banana', false),
  ('a76eab88-4b6c-dc4d-e461-bdb841027177', '377607e3-be88-ff1b-b187-ace606685627', 3, 'Butter', false),
  ('45756218-51b9-0466-744f-f9e90ee797df', '377607e3-be88-ff1b-b187-ace606685627', 4, 'Bread', false),
  ('8b7a1225-a648-3db0-cf71-caf782b2a1a6', '67c29c8d-d672-2d02-4181-47e0bb26f0b4', 1, 'Apple', true),
  ('1ac82b3f-1edc-de8f-1ebf-1ac7f17fee42', '67c29c8d-d672-2d02-4181-47e0bb26f0b4', 2, 'Water', false),
  ('2f7de2e1-7080-146c-6d72-e0b4bdec904f', '67c29c8d-d672-2d02-4181-47e0bb26f0b4', 3, 'Chicken', false),
  ('f2a63f6e-becb-aa43-aed4-a47f401a70a4', '67c29c8d-d672-2d02-4181-47e0bb26f0b4', 4, 'Sugar', false),
  ('0a101cc0-03a9-9fa1-7378-017ca6e4c2f5', '0465099d-69c6-a573-b44e-31a82597382b', 1, 'Rice', false),
  ('e825ad2c-030d-6af2-b22b-7d1c42e8999f', '0465099d-69c6-a573-b44e-31a82597382b', 2, 'Bread', false),
  ('dc1e0ae8-6ac7-7291-d4dd-430169c9f2ca', '0465099d-69c6-a573-b44e-31a82597382b', 3, 'Banana', true),
  ('2e11078c-9a0a-2b92-27f6-b734b18d6f0c', '0465099d-69c6-a573-b44e-31a82597382b', 4, 'Milk', false),
  ('165df4d3-68cd-6620-5e6f-24a329c1b770', 'fbf5a6c5-da7e-8b51-7283-b17a260dd07c', 1, 'Soup', false),
  ('f0c00120-0a18-074d-34a5-bb604ef14f6f', 'fbf5a6c5-da7e-8b51-7283-b17a260dd07c', 2, 'Cake', false),
  ('59d15ab7-08ab-7ce5-67c1-e60bc4ae2816', 'fbf5a6c5-da7e-8b51-7283-b17a260dd07c', 3, 'Cheese', false),
  ('95bca3b0-0777-3b8b-a177-9e43b6621ca8', 'fbf5a6c5-da7e-8b51-7283-b17a260dd07c', 4, 'Butter', true),
  ('29ed56fc-9eb4-d4da-019b-73503f4e9c23', '8fb270bd-27cd-07ee-a00a-2a80abeec347', 1, 'Egg', false),
  ('ca533d62-1216-777f-7300-cda781be3c09', '8fb270bd-27cd-07ee-a00a-2a80abeec347', 2, 'Rice', false),
  ('22d41e28-f0cb-d2c4-4025-9da93a58a44b', '8fb270bd-27cd-07ee-a00a-2a80abeec347', 3, 'Sugar', true),
  ('10193b3e-b178-3aba-ba65-62e340e801f5', '8fb270bd-27cd-07ee-a00a-2a80abeec347', 4, 'Banana', false),
  ('878a5d0a-527c-43be-09b9-280d74b3f333', '797f945f-6313-6e90-b890-85ed0787d9b8', 1, 'Salt', true),
  ('33a3ae23-51a2-e93c-b6dd-69e3ec42f9e4', '797f945f-6313-6e90-b890-85ed0787d9b8', 2, 'Apple', false),
  ('14b7c020-875d-8775-d989-b3fc2b7cf228', '797f945f-6313-6e90-b890-85ed0787d9b8', 3, 'Banana', false),
  ('c647880e-b929-c53c-2e65-49047b7fd912', '797f945f-6313-6e90-b890-85ed0787d9b8', 4, 'Egg', false),
  ('3cea23b7-24ac-bf3a-598c-4c02848b707f', '7c9d4392-9dc5-d8d3-4432-9e432f2903b8', 1, 'Milk', true),
  ('fa8180ad-377c-2c8e-9c75-14b517790fef', '7c9d4392-9dc5-d8d3-4432-9e432f2903b8', 2, 'Cheese', false),
  ('8ad4d926-3408-2153-a429-e0c4b401b854', '7c9d4392-9dc5-d8d3-4432-9e432f2903b8', 3, 'Chicken', false),
  ('b38c7086-7283-8c71-c036-408a8e80d521', '7c9d4392-9dc5-d8d3-4432-9e432f2903b8', 4, 'Apple', false),
  ('3399557f-ccd9-71d7-7f69-6181861432db', '9db55598-6b83-0858-c490-ae0c8c8dacc8', 1, 'Soup', false),
  ('7b4175df-7ff4-25e5-02ab-210390e90705', '9db55598-6b83-0858-c490-ae0c8c8dacc8', 2, 'Sugar', false),
  ('b84a81c7-6a6c-d4bd-fccc-64ffd9e4a9c7', '9db55598-6b83-0858-c490-ae0c8c8dacc8', 3, 'Salt', false),
  ('04256316-d70f-b926-77fa-f15e3ba29f31', '9db55598-6b83-0858-c490-ae0c8c8dacc8', 4, 'Water', true);

insert into phases (id, track_id, number, title, format) values
  ('0281f619-72d0-e321-9e83-8a63780fff7b', '5f649f42-8a7e-3b0a-1732-2ef144e400b8', 3, 'Compreender — parte 1', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('4484a75c-bc30-80ef-ee75-8b394e17a599', '0281f619-72d0-e321-9e83-8a63780fff7b', 'Leitor de Comida', 'Leu e compreendeu as palavras em inglês.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('5a070d07-a4fd-4ddf-e13a-834ba0406e84', '0281f619-72d0-e321-9e83-8a63780fff7b', 1, 'word_meaning', 'Comida', 'Bread', null, null, 'bread', 'Bread significa pão.', null),
  ('731a6066-f3eb-8af0-c9d3-432f6c0038ae', '0281f619-72d0-e321-9e83-8a63780fff7b', 2, 'word_meaning', 'Comida', 'Rice', null, null, 'rice', 'Rice significa arroz.', null),
  ('f6f97b0b-5ec8-77ca-995c-e0ba15a1eb8d', '0281f619-72d0-e321-9e83-8a63780fff7b', 3, 'word_meaning', 'Comida', 'Egg', null, null, 'egg', 'Egg significa ovo.', null),
  ('f5abc75a-d5cd-f0c9-4cc0-4b2bbc548964', '0281f619-72d0-e321-9e83-8a63780fff7b', 4, 'word_meaning', 'Comida', 'Meat', null, null, 'meat', 'Meat significa carne.', null),
  ('66514634-bbad-5242-4a4b-00d0428502ef', '0281f619-72d0-e321-9e83-8a63780fff7b', 5, 'word_meaning', 'Comida', 'Chicken', null, null, 'chicken', 'Chicken significa frango.', null),
  ('116a4ca4-9e4a-842f-1702-8fcf065c7b7c', '0281f619-72d0-e321-9e83-8a63780fff7b', 6, 'word_meaning', 'Comida', 'Cheese', null, null, 'cheese', 'Cheese significa queijo.', null),
  ('a2d9b4c4-d56f-a7e2-55ee-d5333714dda5', '0281f619-72d0-e321-9e83-8a63780fff7b', 7, 'word_meaning', 'Comida', 'Soup', null, null, 'soup', 'Soup significa sopa.', null),
  ('0a16d9f9-c1c1-2180-c751-d90bc96ca670', '0281f619-72d0-e321-9e83-8a63780fff7b', 8, 'word_meaning', 'Comida', 'Cake', null, null, 'cake', 'Cake significa bolo.', null),
  ('d74b877e-8a6f-9ff8-d10f-2408e47435c3', '0281f619-72d0-e321-9e83-8a63780fff7b', 9, 'word_meaning', 'Comida', 'Bread', null, null, 'bread', 'Bread significa pão.', null),
  ('e4a25e33-a29f-d0b8-e307-b285f53a3403', '0281f619-72d0-e321-9e83-8a63780fff7b', 10, 'word_meaning', 'Comida', 'Rice', null, null, 'rice', 'Rice significa arroz.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('0433f35f-1bfe-16fc-bfe2-45e02121f114', '5a070d07-a4fd-4ddf-e13a-834ba0406e84', 1, 'pão', true),
  ('0c78d7b2-9425-7307-d779-78ae2f4a8a6e', '5a070d07-a4fd-4ddf-e13a-834ba0406e84', 2, 'queijo', false),
  ('ebf48db3-3f8a-f929-7f85-504560bb84e9', '5a070d07-a4fd-4ddf-e13a-834ba0406e84', 3, 'açúcar', false),
  ('24903ca7-b57d-b158-1ba9-5f68b235ca76', '5a070d07-a4fd-4ddf-e13a-834ba0406e84', 4, 'sopa', false),
  ('8657d6d6-a916-b5f2-e74e-84849a9b0ac1', '731a6066-f3eb-8af0-c9d3-432f6c0038ae', 1, 'ovo', false),
  ('fe2467ba-1664-fe9b-27b2-3b84ad1287eb', '731a6066-f3eb-8af0-c9d3-432f6c0038ae', 2, 'arroz', true),
  ('f649401d-b727-61e1-6572-d502ca84c7a5', '731a6066-f3eb-8af0-c9d3-432f6c0038ae', 3, 'bolo', false),
  ('2d1cd8e8-9be1-b34b-ee3d-b7524803cb24', '731a6066-f3eb-8af0-c9d3-432f6c0038ae', 4, 'carne', false),
  ('69d6237a-c83d-6910-6523-0ec8fd84d4b5', 'f6f97b0b-5ec8-77ca-995c-e0ba15a1eb8d', 1, 'ovo', true),
  ('b966746c-b07d-e93a-711e-563703596569', 'f6f97b0b-5ec8-77ca-995c-e0ba15a1eb8d', 2, 'água', false),
  ('3c8f807c-83bd-e8db-f27d-5d55697362b8', 'f6f97b0b-5ec8-77ca-995c-e0ba15a1eb8d', 3, 'carne', false),
  ('cae011f4-1361-a476-6dac-afa4243f7b13', 'f6f97b0b-5ec8-77ca-995c-e0ba15a1eb8d', 4, 'queijo', false),
  ('915aca75-95be-4aad-d1fa-3bdf7e913b9e', 'f5abc75a-d5cd-f0c9-4cc0-4b2bbc548964', 1, 'ovo', false),
  ('3d47f0ae-5414-4304-1934-c62435e9bc70', 'f5abc75a-d5cd-f0c9-4cc0-4b2bbc548964', 2, 'suco', false),
  ('0f0e2c9e-b7e6-75d1-e5f3-abd0c9efcabb', 'f5abc75a-d5cd-f0c9-4cc0-4b2bbc548964', 3, 'carne', true),
  ('020c23b2-50ec-14e5-bc30-3f316c006322', 'f5abc75a-d5cd-f0c9-4cc0-4b2bbc548964', 4, 'manteiga', false),
  ('edb91635-1c6c-597a-821e-583e82c4791d', '66514634-bbad-5242-4a4b-00d0428502ef', 1, 'açúcar', false),
  ('bbee6fef-6988-8f31-b812-bc536bcc9d01', '66514634-bbad-5242-4a4b-00d0428502ef', 2, 'maçã', false),
  ('0979abcb-4e84-d79e-e132-33eeeeb1caaa', '66514634-bbad-5242-4a4b-00d0428502ef', 3, 'manteiga', false),
  ('03b30b53-17de-4130-4144-8663f090e8ae', '66514634-bbad-5242-4a4b-00d0428502ef', 4, 'frango', true),
  ('563d97a0-93c5-76fe-48e8-786659061326', '116a4ca4-9e4a-842f-1702-8fcf065c7b7c', 1, 'sopa', false),
  ('4af95df6-e5d6-91af-b31c-c9d05ecca3d5', '116a4ca4-9e4a-842f-1702-8fcf065c7b7c', 2, 'queijo', true),
  ('076f02c5-ec67-8cc1-212d-79bfcdc00876', '116a4ca4-9e4a-842f-1702-8fcf065c7b7c', 3, 'pão', false),
  ('75d1e0b1-00d1-0198-d5cb-4beab585c8ec', '116a4ca4-9e4a-842f-1702-8fcf065c7b7c', 4, 'leite', false),
  ('aba6a4da-0064-08b4-dff0-e6f370e21bdb', 'a2d9b4c4-d56f-a7e2-55ee-d5333714dda5', 1, 'queijo', false),
  ('9700d50c-8466-433b-2885-7b6396618508', 'a2d9b4c4-d56f-a7e2-55ee-d5333714dda5', 2, 'maçã', false),
  ('ab369644-2358-dc3e-bb10-d5287ba02fa7', 'a2d9b4c4-d56f-a7e2-55ee-d5333714dda5', 3, 'sopa', true),
  ('0a8269db-ea07-7184-4588-b159f4aa438e', 'a2d9b4c4-d56f-a7e2-55ee-d5333714dda5', 4, 'suco', false),
  ('3698f3ee-a428-c717-39ba-1bcb9fbbe3f4', '0a16d9f9-c1c1-2180-c751-d90bc96ca670', 1, 'leite', false),
  ('28bacfca-f5a9-cc3a-412d-ea6ce718d598', '0a16d9f9-c1c1-2180-c751-d90bc96ca670', 2, 'banana', false),
  ('def9c558-c501-4af9-1368-947443c55327', '0a16d9f9-c1c1-2180-c751-d90bc96ca670', 3, 'sopa', false),
  ('d7f1d27d-54b9-2b5a-c011-d03f4420ba5a', '0a16d9f9-c1c1-2180-c751-d90bc96ca670', 4, 'bolo', true),
  ('6c644240-85be-b5d6-6dfc-908a01e6b50f', 'd74b877e-8a6f-9ff8-d10f-2408e47435c3', 1, 'suco', false),
  ('3fe877dd-6edd-e47f-bf8d-3eca04ddf38e', 'd74b877e-8a6f-9ff8-d10f-2408e47435c3', 2, 'água', false),
  ('e4026877-4f6a-ed70-a1c0-046cb2296cdc', 'd74b877e-8a6f-9ff8-d10f-2408e47435c3', 3, 'pão', true),
  ('dad46550-1b82-455d-2d13-a70e97e1f777', 'd74b877e-8a6f-9ff8-d10f-2408e47435c3', 4, 'carne', false),
  ('d0f5eb2c-ee86-317a-e9be-e24eac296311', 'e4a25e33-a29f-d0b8-e307-b285f53a3403', 1, 'leite', false),
  ('25b360ac-d0b9-9ec0-ab4f-940bfea56f0c', 'e4a25e33-a29f-d0b8-e307-b285f53a3403', 2, 'água', false),
  ('92926ac1-19a8-24d9-8af3-935756188719', 'e4a25e33-a29f-d0b8-e307-b285f53a3403', 3, 'arroz', true),
  ('f386d6b2-e837-8229-52f8-455409fb90d3', 'e4a25e33-a29f-d0b8-e307-b285f53a3403', 4, 'manteiga', false);

insert into phases (id, track_id, number, title, format) values
  ('106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', '5f649f42-8a7e-3b0a-1732-2ef144e400b8', 4, 'Compreender — parte 2', 'word_meaning');

insert into badges (id, phase_id, name, description, image_url) values
  ('146342ef-be53-6831-23b3-7bcde204053b', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 'Mestre de Comida', 'Dominou o vocabulário da trilha.', '/badges/insignia-padrao.webp');

insert into questions (id, phase_id, position, format, topic, prompt, prompt_translation, image_url, audio_text, explanation, hint) values
  ('98ab2bd4-affb-f6ca-aad5-52d5f5f4bebc', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 1, 'word_meaning', 'Comida', 'Milk', null, null, 'milk', 'Milk significa leite.', null),
  ('2ae27584-ca63-0b51-ff92-d7c24adf868a', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 2, 'word_meaning', 'Comida', 'Water', null, null, 'water', 'Water significa água.', null),
  ('625af1a1-3ced-adf3-51ec-8aaab8776c4d', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 3, 'word_meaning', 'Comida', 'Juice', null, null, 'juice', 'Juice significa suco.', null),
  ('eac758c8-e085-465a-3a6f-542dec84b61c', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 4, 'word_meaning', 'Comida', 'Apple', null, null, 'apple', 'Apple significa maçã.', null),
  ('818a6cb3-35dd-e323-e37f-f963ecef6b81', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 5, 'word_meaning', 'Comida', 'Banana', null, null, 'banana', 'Banana significa banana.', null),
  ('c8372942-ba30-3d87-21d5-9a5e092611ee', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 6, 'word_meaning', 'Comida', 'Butter', null, null, 'butter', 'Butter significa manteiga.', null),
  ('39f930d8-ad71-3013-a004-47dd408fe7b5', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 7, 'word_meaning', 'Comida', 'Sugar', null, null, 'sugar', 'Sugar significa açúcar.', null),
  ('06d11495-196e-fe81-74cd-df9f350b7277', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 8, 'word_meaning', 'Comida', 'Salt', null, null, 'salt', 'Salt significa sal.', null),
  ('77338e5e-b61c-34bb-ebe9-fe1721a1812d', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 9, 'word_meaning', 'Comida', 'Milk', null, null, 'milk', 'Milk significa leite.', null),
  ('b1932c92-e012-b83e-66c9-6c734caad051', '106d6cbb-f40f-a6d7-a5bf-bfd5174f6f9f', 10, 'word_meaning', 'Comida', 'Water', null, null, 'water', 'Water significa água.', null);

insert into question_choices (id, question_id, position, label, is_correct) values
  ('f758d030-4bc0-8540-ed9b-ffccc94c3223', '98ab2bd4-affb-f6ca-aad5-52d5f5f4bebc', 1, 'pão', false),
  ('ccff65cd-7d04-a1b8-d17f-b63bf1ac3295', '98ab2bd4-affb-f6ca-aad5-52d5f5f4bebc', 2, 'leite', true),
  ('d491e7dd-9e71-217d-dc99-c7b61d2fd022', '98ab2bd4-affb-f6ca-aad5-52d5f5f4bebc', 3, 'maçã', false),
  ('6fe0a2fd-be33-e625-e10a-b2db0bc81b11', '98ab2bd4-affb-f6ca-aad5-52d5f5f4bebc', 4, 'carne', false),
  ('d7ece2ca-77e2-3822-3842-0650d24130cb', '2ae27584-ca63-0b51-ff92-d7c24adf868a', 1, 'frango', false),
  ('81963fcd-29bd-8793-ba61-bee159c9450d', '2ae27584-ca63-0b51-ff92-d7c24adf868a', 2, 'água', true),
  ('06642f85-11b8-39d6-1f4e-f7f94f91760f', '2ae27584-ca63-0b51-ff92-d7c24adf868a', 3, 'suco', false),
  ('1489790a-9e26-e2c1-61a0-13e871921038', '2ae27584-ca63-0b51-ff92-d7c24adf868a', 4, 'banana', false),
  ('f9478f5f-5a04-5683-50e6-c92e500b934e', '625af1a1-3ced-adf3-51ec-8aaab8776c4d', 1, 'manteiga', false),
  ('bd132944-de93-936f-6332-7ab6aac24868', '625af1a1-3ced-adf3-51ec-8aaab8776c4d', 2, 'leite', false),
  ('aef3377b-e51b-6ddf-df96-9c6b5695e4ba', '625af1a1-3ced-adf3-51ec-8aaab8776c4d', 3, 'água', false),
  ('8ce19c27-a22e-1afe-c447-e3405f9fce43', '625af1a1-3ced-adf3-51ec-8aaab8776c4d', 4, 'suco', true),
  ('8d93d596-b3f0-e846-92f7-62af7c2c7e78', 'eac758c8-e085-465a-3a6f-542dec84b61c', 1, 'leite', false),
  ('5a78c509-76f2-69ce-895f-392dc9b382be', 'eac758c8-e085-465a-3a6f-542dec84b61c', 2, 'maçã', true),
  ('c2943937-e923-dbca-fe8c-336f42e10b34', 'eac758c8-e085-465a-3a6f-542dec84b61c', 3, 'banana', false),
  ('be2bf587-0ec5-b14c-7d6c-c4131558ce72', 'eac758c8-e085-465a-3a6f-542dec84b61c', 4, 'manteiga', false),
  ('d1737e42-dcc4-6da7-6522-192aa0d89a00', '818a6cb3-35dd-e323-e37f-f963ecef6b81', 1, 'banana', true),
  ('5433897d-59b0-f2a2-4e24-6b4b9a98cab7', '818a6cb3-35dd-e323-e37f-f963ecef6b81', 2, 'maçã', false),
  ('5b41f2a1-0381-379c-7617-f8343deb574f', '818a6cb3-35dd-e323-e37f-f963ecef6b81', 3, 'leite', false),
  ('6294fe86-d322-0ba1-32aa-029995264aec', '818a6cb3-35dd-e323-e37f-f963ecef6b81', 4, 'frango', false),
  ('fa1ce03a-8d45-46a4-2c4c-56674d7f937c', 'c8372942-ba30-3d87-21d5-9a5e092611ee', 1, 'frango', false),
  ('37bec5d1-fffe-5f4b-7cfa-a7df296a384a', 'c8372942-ba30-3d87-21d5-9a5e092611ee', 2, 'sal', false),
  ('fad4593c-773e-48e6-377b-7d3f2fa4cf3f', 'c8372942-ba30-3d87-21d5-9a5e092611ee', 3, 'leite', false),
  ('5c1e6cff-0271-a9be-4797-6b47e475e5ac', 'c8372942-ba30-3d87-21d5-9a5e092611ee', 4, 'manteiga', true),
  ('40f9efcc-6922-25ca-f4ec-71f2610544f4', '39f930d8-ad71-3013-a004-47dd408fe7b5', 1, 'açúcar', true),
  ('79ed3585-63e7-22b2-03eb-8aaa3a4559c3', '39f930d8-ad71-3013-a004-47dd408fe7b5', 2, 'suco', false),
  ('9e1d2ff6-5b45-aa05-942a-9b9d6f6f78a5', '39f930d8-ad71-3013-a004-47dd408fe7b5', 3, 'banana', false),
  ('10112720-a938-99d1-1c0a-edfb0a3729ce', '39f930d8-ad71-3013-a004-47dd408fe7b5', 4, 'arroz', false),
  ('0bbc0a4f-f203-bbfa-a487-2c41387f859f', '06d11495-196e-fe81-74cd-df9f350b7277', 1, 'água', false),
  ('737dedca-27de-7509-0e76-bb8a1948b325', '06d11495-196e-fe81-74cd-df9f350b7277', 2, 'sal', true),
  ('b5cea2ee-26a7-c82c-c4ae-522c5c2fa823', '06d11495-196e-fe81-74cd-df9f350b7277', 3, 'queijo', false),
  ('cf6ef591-7097-23ee-11da-9c83719336ad', '06d11495-196e-fe81-74cd-df9f350b7277', 4, 'bolo', false),
  ('9311b814-7603-efd7-6f0d-f1e3e484cb2b', '77338e5e-b61c-34bb-ebe9-fe1721a1812d', 1, 'queijo', false),
  ('acf7032e-e3a4-88b5-fe36-fe90fe29f802', '77338e5e-b61c-34bb-ebe9-fe1721a1812d', 2, 'sal', false),
  ('53ffdbd5-91c6-b224-314f-05305d08fb29', '77338e5e-b61c-34bb-ebe9-fe1721a1812d', 3, 'pão', false),
  ('976f5841-9cb3-1a74-2420-8d045d2b5dc3', '77338e5e-b61c-34bb-ebe9-fe1721a1812d', 4, 'leite', true),
  ('7d704a73-6cd7-c40c-55fd-17762b33a3a3', 'b1932c92-e012-b83e-66c9-6c734caad051', 1, 'leite', false),
  ('291dddba-e449-1688-0263-6dc5d25fd7b8', 'b1932c92-e012-b83e-66c9-6c734caad051', 2, 'água', true),
  ('d7d1416e-f879-221a-e7ca-d5d18fc1e51b', 'b1932c92-e012-b83e-66c9-6c734caad051', 3, 'banana', false),
  ('295fa59a-9bbf-5d6e-1d1a-d3f31ab026fd', 'b1932c92-e012-b83e-66c9-6c734caad051', 4, 'arroz', false);

commit;
