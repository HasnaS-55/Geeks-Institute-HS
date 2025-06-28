SELECT COUNT(*)
FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NULL); 
    --"SELECT id FROM SecondTab WHERE id IS NULL" returns NULL
    --Any comparison with NULL returns UNKNOWN (not TRUE or FALSE)
    --so no rows will satisfy the condition
    --Expected Output: 0



SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id = 5) 
--"SELECT id FROM SecondTab WHERE id = 5" returns [5]
    --ids in FirstTab not in this list (5), Valid matches: 6, 7 (NULL doesn't count in comparisons)
    --Expected Output: 2


SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab)

--"SELECT id FROM SecondTab" returns [5, NULL]
--NOT IN with NULL in the list makes the whole condition UNKNOWN
--No rows will satisfy the condition
--Expected Output: 0


SELECT COUNT(*) FROM FirstTab AS ft WHERE ft.id NOT IN (SELECT id FROM SecondTab WHERE id IS NOT NULL)
--"SELECT id FROM SecondTab WHERE IS NOT NULL" returns [5]
    --ids in FirstTab not in this list (5), Valid matches: 6, 7 (NULL doesn't count in comparisons)
    --Expected Output: 2






